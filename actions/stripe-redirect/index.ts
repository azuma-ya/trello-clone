"use server";

import { auth, currentUser } from "@clerk/nextjs/server";

import { createSafeAction } from "@/lib/create-safe-actions";
import { db } from "@/lib/db";
import { stripe } from "@/lib/stripe";
import { absoluteUrl } from "@/lib/utils";

import { revalidatePath } from "next/cache";
import { StripeRedirect } from "./schema";
import type { InputType, ReturnType } from "./types";

// eslint-disable-next-line
const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();
  const user = await currentUser();

  if (!userId || !orgId || !user) {
    return {
      error: "Unauthlized",
    };
  }

  const settingsUrl = absoluteUrl(`/organization/${orgId}`);

  let url = "";

  try {
    const orgSubscription = await db.orgSubscription.findUnique({
      where: {
        orgId,
      },
    });

    if (orgSubscription && orgSubscription.stripeCustomerId) {
      const stripeSesstion = await stripe.billingPortal.sessions.create({
        customer: orgSubscription.stripeCustomerId,
        return_url: settingsUrl,
      });

      url = stripeSesstion.url;
    } else {
      const stripeSesstion = await stripe.checkout.sessions.create({
        success_url: settingsUrl,
        cancel_url: settingsUrl,
        payment_method_types: ["card"],
        mode: "subscription",
        billing_address_collection: "auto",
        customer_email: user.emailAddresses[0].emailAddress,
        line_items: [
          {
            price_data: {
              currency: "USD",
              product_data: {
                name: "Azello Pro",
                description: "Unlimited boards for your organization",
              },
              unit_amount: 2000,
              recurring: {
                interval: "month",
              },
            },
            quantity: 1,
          },
        ],
        metadata: { orgId },
      });

      url = stripeSesstion.url || "";
    }
  } catch (error) {
    return {
      error: "Something went wrong",
    };
  }

  revalidatePath(`/organization/${orgId}`);

  return { data: url };
};

export const stripeRedirect = createSafeAction(StripeRedirect, handler);

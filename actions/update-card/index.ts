"use server";

import { auth } from "@clerk/nextjs/server";
import { ACTION, ENTITY_TYPE } from "@prisma/client";
import { revalidatePath } from "next/cache";

import { createAuditLog } from "@/lib/create-audit-log";
import { createSafeAction } from "@/lib/create-safe-actions";
import { db } from "@/lib/db";

import { UpdateCard } from "./schema";
import { InputType, ReturnType } from "./types";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: "Unauthlized",
    };
  }

  const { boardId, id, ...rest } = data;
  let card;

  try {
    card = await db.$transaction(async (db) => {
      const card = await db.card.update({
        where: {
          id,
          list: {
            board: { orgId },
          },
        },
        data: {
          ...rest,
        },
      });

      await createAuditLog(db, {
        entityId: card.id,
        entityTitle: card.title,
        entityType: ENTITY_TYPE.CARD,
        action: ACTION.UPDATE,
      });

      return card;
    });
  } catch (error) {
    return {
      error: "Failed to update.",
    };
  }
  revalidatePath(`/board/${boardId}`);
  return { data: card };
};

export const updateCard = createSafeAction(UpdateCard, handler);

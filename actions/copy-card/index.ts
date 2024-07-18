"use server";

import { auth } from "@clerk/nextjs/server";
import { ACTION, ENTITY_TYPE } from "@prisma/client";
import { revalidatePath } from "next/cache";

import { createAuditLog } from "@/lib/create-audit-log";
import { createSafeAction } from "@/lib/create-safe-actions";
import { db } from "@/lib/db";

import { CopyCard } from "./schema";
import { InputType, ReturnType } from "./types";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: "Unauthlized",
    };
  }

  const { id, boardId } = data;
  let card;

  try {
    const cardToCopy = await db.card.findUnique({
      where: {
        id,
        list: {
          board: {
            orgId,
          },
        },
      },
    });

    if (!cardToCopy) {
      return {
        error: "Card not found",
      };
    }

    const lastCard = await db.card.findFirst({
      where: { listId: cardToCopy.listId },
      orderBy: { order: "desc" },
      select: { order: true },
    });

    const newOrder = lastCard ? lastCard.order + 1 : 1;

    card = await db.$transaction(async (db) => {
      const card = await db.card.create({
        data: {
          title: `${cardToCopy.title} - Copy`,
          description: cardToCopy.description,
          order: newOrder,
          listId: cardToCopy.listId,
        },
      });

      await createAuditLog(db, {
        entityId: card.id,
        entityTitle: card.title,
        entityType: ENTITY_TYPE.CARD,
        action: ACTION.CREATE,
      });

      return card;
    });
  } catch (error) {
    return {
      error: "Failed to delete.",
    };
  }
  revalidatePath(`/board/${boardId}`);
  return { data: card };
};

export const copyCard = createSafeAction(CopyCard, handler);

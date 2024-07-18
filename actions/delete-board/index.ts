"use server";

import { auth } from "@clerk/nextjs/server";
import { ACTION, ENTITY_TYPE } from "@prisma/client";
import { revalidatePath } from "next/cache";

import { createAuditLog } from "@/lib/create-audit-log";
import { createSafeAction } from "@/lib/create-safe-actions";
import { db } from "@/lib/db";

import { decrementAvailableCount } from "@/lib/org-limit";
import { checkSubscription } from "@/lib/subscription";
import { redirect } from "next/navigation";
import { DeleteBoard } from "./schema";
import type { InputType, ReturnType } from "./types";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: "Unauthlized",
    };
  }

  const isPro = await checkSubscription();

  const { id } = data;

  try {
    await db.$transaction(async (db) => {
      const board = await db.board.delete({
        where: {
          id,
          orgId,
        },
      });

      await createAuditLog(db, {
        entityId: board.id,
        entityTitle: board.title,
        entityType: ENTITY_TYPE.BOARD,
        action: ACTION.DELETE,
      });

      if (!isPro) {
        await decrementAvailableCount(db);
      }

      return board;
    });
  } catch (error) {
    return {
      error: "Failed to delete.",
    };
  }
  revalidatePath(`/board/${id}`);
  redirect(`/organization/${orgId}`);
};

export const deleteBoard = createSafeAction(DeleteBoard, handler);

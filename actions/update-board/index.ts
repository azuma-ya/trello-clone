"use server";

import { auth } from "@clerk/nextjs/server";
import { ACTION, ENTITY_TYPE } from "@prisma/client";
import { revalidatePath } from "next/cache";

import { createAuditLog } from "@/lib/create-audit-log";
import { createSafeAction } from "@/lib/create-safe-actions";
import { db } from "@/lib/db";

import { UpdateBoard } from "./schema";
import type { InputType, ReturnType } from "./types";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: "Unauthlized",
    };
  }

  const { title, id } = data;
  let board;

  try {
    board = await db.$transaction(async (db) => {
      const board = await db.board.update({
        where: {
          id,
          orgId,
        },
        data: {
          title,
        },
      });

      await createAuditLog(db, {
        entityId: board.id,
        entityTitle: board.title,
        entityType: ENTITY_TYPE.BOARD,
        action: ACTION.UPDATE,
      });

      return board;
    });
  } catch (error) {
    return {
      error: "Failed to update.",
    };
  }
  revalidatePath(`/board/${id}`);
  return { data: board };
};

export const updateBoard = createSafeAction(UpdateBoard, handler);

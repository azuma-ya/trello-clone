"use server";

import { auth } from "@clerk/nextjs/server";
import { ACTION, ENTITY_TYPE } from "@prisma/client";
import { revalidatePath } from "next/cache";

import { createAuditLog } from "@/lib/create-audit-log";
import { createSafeAction } from "@/lib/create-safe-actions";
import { db } from "@/lib/db";

import { DeleteList } from "./schema";
import type { InputType, ReturnType } from "./types";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: "Unauthlized",
    };
  }

  const { id, boardId } = data;
  let list;

  try {
    list = await db.$transaction(async (db) => {
      const list = await db.list.delete({
        where: {
          id,
          boardId,
          board: {
            orgId,
          },
        },
      });

      await createAuditLog(db, {
        entityId: list.id,
        entityTitle: list.title,
        entityType: ENTITY_TYPE.LIST,
        action: ACTION.DELETE,
      });

      return list;
    });
  } catch (error) {
    return {
      error: "Failed to delete.",
    };
  }
  revalidatePath(`/board/${boardId}`);
  return { data: list };
};

export const deletelist = createSafeAction(DeleteList, handler);

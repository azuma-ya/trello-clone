"use server";

import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";

import { createSafeAction } from "@/lib/create-safe-actions";
import { db } from "@/lib/db";

import { createAuditLog } from "@/lib/create-audit-log";
import { ACTION, ENTITY_TYPE } from "@prisma/client";
import { UpdateList } from "./schema";
import type { InputType, ReturnType } from "./types";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: "Unauthlized",
    };
  }

  const { title, id, boardId } = data;
  let list;

  try {
    list = await db.$transaction(async (db) => {
      const list = await db.list.update({
        where: {
          id,
          boardId,
          board: {
            orgId,
          },
        },
        data: {
          title,
        },
      });

      await createAuditLog(db, {
        entityId: list.id,
        entityTitle: list.title,
        entityType: ENTITY_TYPE.LIST,
        action: ACTION.UPDATE,
      });

      return list;
    });
  } catch (error) {
    return {
      error: "Failed to update.",
    };
  }
  revalidatePath(`/board/${boardId}`);
  return { data: list };
};

export const updateList = createSafeAction(UpdateList, handler);

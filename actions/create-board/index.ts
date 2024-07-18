"use server";

import { auth } from "@clerk/nextjs/server";
import { ACTION, ENTITY_TYPE } from "@prisma/client";
import { revalidatePath } from "next/cache";

import { createAuditLog } from "@/lib/create-audit-log";
import { createSafeAction } from "@/lib/create-safe-actions";
import { db } from "@/lib/db";
import { hasAvailableCount, incrementAvailableCount } from "@/lib/org-limit";

import { checkSubscription } from "@/lib/subscription";
import { CreateBoard } from "./schema";
import { InputType, ReturnType } from "./types";

const handler = async (data: InputType): Promise<ReturnType> => {
  const { userId, orgId } = auth();

  if (!userId || !orgId) {
    return {
      error: "Unautorized",
    };
  }

  const canCreate = await hasAvailableCount();
  const isPro = await checkSubscription();

  if (!canCreate && !isPro) {
    return {
      error:
        "You have reached your limit of free boards. Please upgrade to create more.",
    };
  }

  const { title, image } = data;
  const [imageId, imageThumbUrl, imageFullUrl, imageUserName, imageLinkHTML] =
    image.split("|");

  if (
    !imageId ||
    !imageThumbUrl ||
    !imageFullUrl ||
    !imageUserName ||
    !imageLinkHTML
  ) {
    return {
      error: "Missing fields. Failed to create board.",
    };
  }

  let board;

  try {
    board = await db.$transaction(async (db) => {
      const board = await db.board.create({
        data: {
          title,
          orgId,
          imageId,
          imageThumbUrl,
          imageFullUrl,
          imageUserName,
          imageLinkHTML,
        },
      });

      await createAuditLog(db, {
        entityId: board.id,
        entityTitle: board.title,
        entityType: ENTITY_TYPE.BOARD,
        action: ACTION.CREATE,
      });

      if (!isPro) {
        await incrementAvailableCount(db);
      }

      return board;
    });
  } catch (error) {
    return {
      error: "Failed to create.",
    };
  }

  revalidatePath(`/board/${board.id}`);
  return { data: board };
};

export const createBoard = createSafeAction(CreateBoard, handler);

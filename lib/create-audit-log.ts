import { auth, currentUser } from "@clerk/nextjs/server";
import { ACTION, ENTITY_TYPE } from "@prisma/client";

import { PrismaTransactionClient } from "@/lib/db";

interface Props {
  entityId: string;
  entityType: ENTITY_TYPE;
  entityTitle: string;
  action: ACTION;
}

export const createAuditLog = async (
  db: PrismaTransactionClient,
  props: Props,
) => {
  try {
    const { orgId } = auth();
    const user = await currentUser();

    if (!user || !orgId) {
      throw new Error("User not found");
    }

    await db.auditLog.create({
      data: {
        ...props,
        orgId,
        userId: user.id,
        userImage: user.imageUrl,
        userName: user.firstName + " " + user.lastName,
      },
    });
  } catch (error) {
    console.log("[AUDIT_LOG_ERROR]", error);
  }
};

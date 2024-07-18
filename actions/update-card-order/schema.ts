import { schemaForType } from "@/lib/utils";
import type { Card } from "@prisma/client";
import { z } from "zod";

export const UpdateCardOrder = z.object({
  items: z.array(
    schemaForType<Card>()(
      z.object({
        id: z.string(),
        listId: z.string(),
        title: z.string(),
        description: z.string().nullable(),
        order: z.number(),
        createdAt: z.date(),
        updatedAt: z.date(),
      }),
    ),
  ),
  boardId: z.string(),
});

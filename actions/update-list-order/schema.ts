import { schemaForType } from "@/lib/utils";
import { List } from "@prisma/client";
import { z } from "zod";

export const UpdateListOrder = z.object({
  items: z.array(
    schemaForType<List>()(
      z.object({
        id: z.string(),
        boardId: z.string(),
        title: z.string(),
        order: z.number(),
        createdAt: z.date(),
        updatedAt: z.date(),
      }),
    ),
  ),
  boardId: z.string(),
});

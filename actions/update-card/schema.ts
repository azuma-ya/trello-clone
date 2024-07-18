import { z } from "zod";

export const UpdateCard = z.object({
  title: z
    .string({
      required_error: "Title is required",
      invalid_type_error: "Title is rquired",
    })
    .min(3, {
      message: "Title is too short",
    })
    .optional(),
  boardId: z.string(),
  id: z.string(),
  description: z
    .string()
    .min(3, {
      message: "Description is too short",
    })
    .optional(),
});

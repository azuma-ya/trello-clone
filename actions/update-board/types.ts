import type { z } from "zod";

import type { UpdateBoard } from "@/actions/update-board/schema";
import type { ActionState } from "@/lib/create-safe-actions";
import type { Board } from "@prisma/client";

export type InputType = z.infer<typeof UpdateBoard>;
export type ReturnType = ActionState<InputType, Board>;

import type { Board } from "@prisma/client";
import type { z } from "zod";

import type { CreateBoard } from "@/actions/create-board/schema";
import type { ActionState } from "@/lib/create-safe-actions";

export type InputType = z.infer<typeof CreateBoard>;
export type ReturnType = ActionState<InputType, Board>;

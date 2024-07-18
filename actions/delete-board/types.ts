import type { z } from "zod";

import type { ActionState } from "@/lib/create-safe-actions";
import type { Board } from "@prisma/client";
import type { DeleteBoard } from "./schema";

export type InputType = z.infer<typeof DeleteBoard>;
export type ReturnType = ActionState<InputType, Board>;

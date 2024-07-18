import type { z } from "zod";

import type { ActionState } from "@/lib/create-safe-actions";
import type { Card } from "@prisma/client";
import type { UpdateCardOrder } from "./schema";

export type InputType = z.infer<typeof UpdateCardOrder>;
export type ReturnType = ActionState<InputType, Card[]>;

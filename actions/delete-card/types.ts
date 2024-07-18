import type { z } from "zod";

import type { ActionState } from "@/lib/create-safe-actions";
import type { Card } from "@prisma/client";
import type { DeleteCard } from "./schema";

export type InputType = z.infer<typeof DeleteCard>;
export type ReturnType = ActionState<InputType, Card>;

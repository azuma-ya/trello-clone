import type { z } from "zod";

import type { ActionState } from "@/lib/create-safe-actions";
import type { Card } from "@prisma/client";
import type { CopyCard } from "./schema";

export type InputType = z.infer<typeof CopyCard>;
export type ReturnType = ActionState<InputType, Card>;

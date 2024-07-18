import { z } from "zod";

import { ActionState } from "@/lib/create-safe-actions";
import { Card } from "@prisma/client";
import { DeleteCard } from "./schema";

export type InputType = z.infer<typeof DeleteCard>;
export type ReturnType = ActionState<InputType, Card>;

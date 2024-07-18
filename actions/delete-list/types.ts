import type { z } from "zod";

import type { ActionState } from "@/lib/create-safe-actions";
import type { List } from "@prisma/client";
import type { DeleteList } from "./schema";

export type InputType = z.infer<typeof DeleteList>;
export type ReturnType = ActionState<InputType, List>;

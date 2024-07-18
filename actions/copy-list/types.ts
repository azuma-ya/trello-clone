import type { z } from "zod";

import type { ActionState } from "@/lib/create-safe-actions";
import type { List } from "@prisma/client";
import type { CopyList } from "./schema";

export type InputType = z.infer<typeof CopyList>;
export type ReturnType = ActionState<InputType, List>;

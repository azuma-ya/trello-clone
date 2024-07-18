import type { Prisma } from "@prisma/client";
import { PrismaClient } from "@prisma/client";
import type { DefaultArgs } from "@prisma/client/runtime/library";

declare global {
  // eslint-disable-next-line
  var prisma: PrismaClient | undefined;
}

export const db = globalThis.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") globalThis.prisma = db;

export type PrismaTransactionClient = Omit<
  PrismaClient<Prisma.PrismaClientOptions, never, DefaultArgs>,
  "$connect" | "$disconnect" | "$on" | "$transaction" | "$use" | "$extends"
>;

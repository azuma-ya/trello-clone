import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";
import type { z } from "zod";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const schemaForType =
  <T>() =>
  // eslint-disable-next-line
  <S extends z.ZodType<T, any, any>>(arg: S) => {
    return arg;
  };

export function absoluteUrl(path: string) {
  return `${process.env.NEXT_PUBLIC_APP_URL}${path}`;
}

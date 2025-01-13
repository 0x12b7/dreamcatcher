import type { Some } from "@root";
import { isBranded } from "@root";

export function isSome(unknown: unknown): unknown is Some<unknown> {
    return isBranded(unknown, "Some");
}
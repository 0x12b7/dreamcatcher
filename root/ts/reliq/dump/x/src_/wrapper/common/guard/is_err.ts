import type { Err } from "@root";
import { isBranded } from "@root";

export function isErr(unknown: unknown): unknown is Err<unknown> {
    return isBranded(unknown, "Err");
}
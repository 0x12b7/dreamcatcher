import type { Err } from "@root";
import { isBrand } from "@root";

export function isErr(unknown: unknown): unknown is Err<unknown> {
    return isBrand(unknown, "Err");
}
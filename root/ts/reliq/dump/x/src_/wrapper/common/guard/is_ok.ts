import type { Ok } from "@root";
import { isBranded } from "@root";

export function isOk(unknown: unknown): unknown is Ok<unknown> {
    return isBranded(unknown, "Ok");
}
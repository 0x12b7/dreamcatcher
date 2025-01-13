import type { Ok } from "@root";
import { isBrand } from "@root";

export function isOk(unknown: unknown): unknown is Ok<unknown> {
    return isBrand(unknown, "Ok");
}
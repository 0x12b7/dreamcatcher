import { Some } from "@root";
import { isBrand } from "@root";

export function isSome(unknown: unknown): unknown is Some<unknown> {
    return isBrand(unknown, "Some");
}
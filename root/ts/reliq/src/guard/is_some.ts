import type { Some } from "@root";
import { isBrand } from "@root";

function isSome(unknown: unknown): unknown is Some<unknown> {
    return isBrand(unknown, "Some");
}

export { isSome };
import type { Err } from "@root";
import { isBrand } from "@root";

function isErr(unknown: unknown): unknown is Err<unknown> {
    return isBrand(unknown, "Err");
}

export { isErr };
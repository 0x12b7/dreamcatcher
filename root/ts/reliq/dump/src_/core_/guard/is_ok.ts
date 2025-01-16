import type { Ok } from "@root";
import { isBrand } from "@root";

function isOk(unknown: unknown): unknown is Ok<unknown> {
    return isBrand(unknown, "Ok");
}

export { isOk };
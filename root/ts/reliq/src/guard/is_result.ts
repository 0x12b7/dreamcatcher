import type { Result } from "@root";
import { isOk } from "@root";
import { isErr } from "@root";

function isResult(unknown: unknown): unknown is Result<unknown, unknown> {
    return isOk(unknown) || isErr(unknown);
}

export { isResult };
import type { Result } from "@root";
import { isOk } from "@root";
import { isErr } from "@root";

export function isResult(unknown: unknown): unknown is Result<unknown, unknown> {
    return isOk(unknown) || isErr(unknown);
}
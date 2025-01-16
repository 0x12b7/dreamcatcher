import {
    type Result,
    isOk,
    isErr
} from "@root";

export function isResult(unknown: unknown): unknown is Result<unknown, unknown> {
    return isOk(unknown) || isErr(unknown);
}
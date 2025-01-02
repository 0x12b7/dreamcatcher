import { require } from "@root";

export function assert<T extends string>(condition: boolean, errcode: T): asserts condition {
    if (condition) {
        return;
    }
    let e: Error = Error(errcode);
    Error.captureStackTrace(e, require);
    throw e;
}
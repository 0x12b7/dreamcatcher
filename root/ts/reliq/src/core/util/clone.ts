import { type Result } from "@core";
import { wrap } from "@core";

export function clone<T1>(x: T1): Result<T1, DOMException> {
    return wrap(() => {
        return structuredClone(x);
    }).mapErr(unsafe => {
        /// WARNING
        return unsafe.unwrap() as DOMException;
    });
}
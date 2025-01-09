import { type Result } from "@root";
import { wrap } from "@root";

export function clone<T1>(x: T1): Result<T1, DOMException> {
    return wrap(() => {
        return structuredClone(x);
    }).mapErr(unsafe => {
        /// WARNING
        return unsafe.unwrap() as DOMException;
    });
}
import { Result } from "@root";
import { wrap } from "@root";

export function clone<T1>(v: T1): Result<T1, DOMException> {
    return wrap(() => {
        return structuredClone(v);
    }).mapErr(unsafe => {
        /// WARNING
        return unsafe.unwrap() as DOMException;
    });
}
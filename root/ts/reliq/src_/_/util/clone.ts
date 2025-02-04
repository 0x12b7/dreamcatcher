import type { Result } from "@root";
import { DomError } from "@root";
import { wrap } from "@root";

/**
 * ***Brief***
 * Creates a deep clone of the provided value using the structuredClone API.
 * 
 * ***Example***
 * ```ts
 *  clone()
 *      .resolve(e => {
 *          if (e.code === "DOM.ERR_DATA_CLONE") {
 *              /// ...
 *          }
 *      })
 *      .unlock();
 * ```
 */
export function clone<T1>(value: T1): Result<T1, DomError> {
    return wrap(() => {
        return structuredClone(value);
    }).mapErr(unsafe => {
        return unsafe
            .parse((self): self is DOMException => {
                return self !== null
                    && self !== undefined
                    && typeof self === "object"
                    && "name" in self
                    && "code" in self
                    && "message" in self
                    && typeof self.name === "string"
                    && typeof self.code === "number"
                    && typeof self.message === "string";
            })
            .map(exception => {
                return DomError(exception);
            })
            .unlockOr(DomError());
    });
}
import { type Result } from "@root";
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
            .parse((instance): instance is DOMException => {
                return instance !== null
                    && instance !== undefined
                    && typeof instance === "object"
                    && "name" in instance
                    && "code" in instance
                    && "message" in instance
                    && typeof instance.name === "string"
                    && typeof instance.code === "number"
                    && typeof instance.message === "string";
            })
            .map(exception => {
                return DomError(exception);
            })
            .unwrapOr(DomError());
    });
}
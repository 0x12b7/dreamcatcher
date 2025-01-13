import type { Option } from "@root";

/**
 * 
 * **Example**
 * ```typescript
 *  type CustomErrorCode =
 *      | "ERR_USER_NOT_FOUND"
 *      | "ERR_SOMETHING_WENT_WRONG"
 *      | "ERR_INVALID_RESPONSE";
 * 
 *  type CustomError = Error<CustomErrorCode>;
 * 
 *  let e: CustomError = Error({
 *      code: "ERR_USER_NOT_FOUND",
 *      message: Some("A user's data could not be found."),
 *      payload: None
 *  });
 * ```
 */
type Error<T1 extends string, T2 extends Array<unknown> = []> = {
    code: T1;
    message: Option<string>;
    payload: Option<T2>;
};

function Error<T1 extends string, T2 extends Array<unknown> = []>(_this: Error<T1, T2>): Error<T1, T2> {
    /** @constructor */ {
        return _this;
    }
}

export { Error };
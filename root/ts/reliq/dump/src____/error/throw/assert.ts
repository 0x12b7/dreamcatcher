import {
    require
} from "@root";

/**
 * **Note**
 * - Similar to `require`.
 * - Should be used to make assertions that must always return `true`.
 * - Typically used at the end of a block of code.
 * 
 * **Example**
 * ```
 *  type ErrorCode =
 *      | "ERR_0"
 *      | "ERR_1"
 *      | "ERR_3";
 * 
 *  assert<ErrorCode>(5 === 5, "ERR_0");
 * ```
 * 
 * **Example**
 * ```
 *  assert(5 === 5, "The world as we know it is ending.");
 * ```
 */
export function assert<T1 extends string>(condition: boolean, message: T1): asserts condition is true {
    return require(condition, message);
}
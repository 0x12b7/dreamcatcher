import {
    panic
} from "@error";

/**
 * **NOTE**
 * 
 * 
 * **OUTCOME**
 * Throw if the condition is `false`.
 * 
 * @example
 *  function main(input: string): void {
 *      require(input.trim() !== "", "Invalid input.");
 *      /// ...
 *      return;
 *  }
 * 
 * 
 */
export function require<T1 extends string>(condition: boolean, message: T1): asserts condition is true {
    if (!condition) panic(message, require);
    return;
}
import { panic } from "@root";

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
function require<T1 extends string>(condition: boolean, message: T1): asserts condition is true {
    if (!condition) panic(message, require);
    return;
}

export { require };
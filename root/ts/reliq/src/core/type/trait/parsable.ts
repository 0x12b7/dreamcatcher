import type { TypeGuard } from "@root";
import type { Option } from "@root";

/**
 * ***Brief***
 * A type-safe abstraction for wrapping a value, allowing validation and transformation 
 * through user-defined type guard functions. Enables runtime type validation and conditional parsing.
 * 
 * ***Example***
 * ```ts
 *  function isNumber(unknown: unknown): unknown is number {
 *      return typeof unknown === "number";
 *  }
 * 
 *  let parsable: Parsable;
 *  parsable
 *      .parse(isNumber)
 *      .map(number => {
 *          /// Will only be executed if wrapped value is a `number`.
 *          /// ...
 *      });
 * ```
 */
export type ParsableWrapper  = {

    /**
     * ***Brief***
     * The `parse` method allows transforming and validating a wrapped value using a type guard.
     * 
     * ***Example***
     * ```ts
     *  function isNumber(unknown: unknown): unknown is number {
     *      return typeof unknown === "number";
     *  }
     * 
     *  let parsable: Parsable;
     *  parsable
     *      .parse(isNumber)
     *      .map(number => {
     *          /// Will only be executed if wrapped value is a `number`.
     *          /// ...
     *      });
     * ```
     * 
     */
    parse<T1>(guard: TypeGuard<T1>): Option<T1>;
};
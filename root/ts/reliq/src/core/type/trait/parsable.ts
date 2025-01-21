import type { TypeGuard } from "@root";
import type { Option } from "@root";

/**
 * ***Brief***
 * A type-safe abstraction for wrapping a value, allowing validation and transformation 
 * through user-defined type guard functions. Enables runtime type validation and conditional parsing.
 * ```
 */
export type ParsableWrapper  = {

    /**
     * ***Brief***
     * `parse` allows validating a wrapped value using a type guard.
     */
    parse<T1>(guard: TypeGuard<T1>): Option<T1>;
};
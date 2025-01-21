import type { TypeGuard } from "@root";
import type { Option } from "@root";

/**
 * ***Brief***
 * A type-safe abstraction, enabling validation and transformation through user-defined type guard functions.
 */
export type Parsable  = {

    /**
     * ***Brief***
     * `parse` validates the value using a provided type guard function.
     * 
     * ***Example***
     * ```ts
     *  
     * ```
     */
    parse<T1>(guard: TypeGuard<T1>): Option<T1>;
};
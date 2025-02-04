import type { TypeGuard } from "@core";
import type { Option } from "@core";

/**
 * ***Brief***
 * A type-safety trait, enabling validation and transformation through user-defined type guard functions.
 * 
 * ***Example***
 * ```ts
 *  let foo: Parsable;
 *  foo
 *      .parse((inst): inst is bigint => typeof inst === "bigint")
 *      .map(int => {
 *          /// ...
 *      });
 * ```
 */
export type Parsable = {

    /**
     * ***Brief***
     * `parse` validates the value using a provided type guard function.
     * 
     * ***Example***
     * ```ts
     *  let foo: Parsable;
     *  foo
     *      .parse((inst): inst is bigint => typeof inst === "bigint")
     *      .map(int => {
     *          /// ...
     *      });
     * ```
     */
    parse<T1>(guard: TypeGuard<T1>): Option<T1>;
};
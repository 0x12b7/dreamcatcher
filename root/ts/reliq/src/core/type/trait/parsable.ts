import {
    type TypeGuard,
    type Option
} from "@root";

export type Parsable  = {

    /**
     * **Example**
     * ```ts
     *  let isNumber: TypeGuard<number>;
     *  let parsable: Parsable;
     *  parsable
     *      .parse(isNumber)
     *      .map(number => {
     *          /// Will only be executed if parsable wraps or is a `number`.
     *          /// ...
     *      });
     * ```
     * 
     */
    parse<T1>(guard: TypeGuard<T1>): Option<T1>;
};
import type { SomeValOfAll } from "@core";
import { Option } from "@core";

/**
 * ***Brief***
 * Utility class for handling tasks within `Option`.
 */
export type OptionHandler = {

    /**
     * ***Brief***
     * Wraps a value into an `Option`, turning `null` or `undefined` to `None`.
     * 
     * ***Example***
     * ```ts
     *  let foo: string | undefined;
     *  Option
     *      .flag(foo)
     *      .map(foo => {
     *          /// ...
     *      });
     * ```
     */
    flag<T1>(value: T1 | null | undefined): Option<T1>;

    /**
     * ***Brief***
     * Iterates through an array of `Option`, short-circuiting at the first `None`.
     * 
     * ***Example***
     * ```ts
     *  let o0: Option<200n>;
     *  let o1: Option<201n>;
     *  let o2: Option<202n>;
     *  let o: Option<[200n, 201n, 202n]> = Option.all([o0, o1, o2]);
     * ```
     */
    all<T1 extends Array<Option<unknown>>>(...options: T1): Option<SomeValOfAll<T1>>;
    
    /**
     * ***Brief***
     * Iterates through an array of `Option`, short-circuiting at the first `Some`.
     * 
     * ***Example***
     * ```ts
     *  let o0: Option<200n>;
     *  let o1: Option<201n>;
     *  let o2: Option<202n>;
     *  let o: Option<200n | 201n | 202n> = Option.any([o0, o1, o2]);
     * ```
     */
    any<T1 extends Array<Option<unknown>>>(...options: T1): Option<SomeValOfAll<T1>[number]>;
};
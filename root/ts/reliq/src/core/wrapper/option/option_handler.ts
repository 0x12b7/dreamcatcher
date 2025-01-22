import type { Option } from "@root";
import type { SomeValOfAll } from "@root";

/**
 * ***Brief***
 * Utility class for handling tasks within `Option`.
 */
export type OptionHandler = {

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
    all<T1 extends Array<Option<unknown>>>(options: T1): Option<SomeValOfAll<T1>>;
    
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
    any<T1 extends Array<Option<unknown>>>(options: T1): Option<SomeValOfAll<T1>[number]>;
};
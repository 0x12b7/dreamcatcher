import type { Function } from "@root";
import type { Option } from "@root";
import { None } from "@root";
import { Ok } from "@root";

export type Some<T1> = {

    /**
     * ***Brief***
     * `some` checks if the current instance is `Some`.
     * 
     * ***Example***
     * ```ts
     *  let option: Option<200>;
     *  if (option.some()) {
     *      /// `option` is `Some<200>`.
     *      /// ...
     *  }
     * ```
     */
    some(): this is Some<T1>;

    /**
     * ***Brief***
     * `none` checks if the current instance is `None`.
     * 
     * ***Example***
     * ```ts
     *  let option: Option<200>;
     *  if (option.none()) {
     *      /// `option` is `None`.
     *      /// ...
     *  }
     * ```
     */
    none(): this is None;

    /**
     * ***Brief***
     * `expect` terminates the program with `panic` when the `Option` is `None`.
     * 
     * ***Note***
     * * Use `expect` when you are confident that an `Option` is `Some`. 
     * * Unlike `unlock`, it can be invoked directly on an `Option` without requiring additional handling.
     * 
     * ***Warning***
     * Reserved for unrecoverable errors, where a missing value will halt execution or result in a critical issue.
     * 
     * ***Example***
     * ```ts
     *  let option: Option<200>;
     *  let status: number = option.expect("This is a bug.");
     * ```
     */
    expect(__: unknown): T1;

    
    unlock(): T1;

    /**
     * ***Brief***
     * Safely retrievesddd the `fallback` value when `None`.
     * 
     * **Example**
     * ```ts
     *  let option: Option<200> = None;
     *  let status: number = option.unlockOr(404);
     *  console.log(status); /// 404.
     * ```
     */
    unlockOr(__: unknown): T1;
    and<T2>(task: Function<T1, Option<T2>>): Option<T2>;
    map<T2>(task: Function<T1, T2>): Some<T2>;
    toResult(__: unknown): Ok<T1>;
};

export function Some<T1>(_value: T1): Some<T1> {
    /** @constructor */ {
        return {
            some,
            none,
            expect,
            unlock,
            unlockOr,
            and,
            map,
            toResult
        };
    }

    function some(): this is Some<T1> {
        return true;
    }

    function none(): this is None {
        return false;
    }

    function expect(__: unknown): T1 {
        return _value;
    }

    function unlock(): T1 {
        return _value;
    }

    function unlockOr(__: unknown): T1 {
        return _value;
    }

    function and<T2>(task: Function<T1, Option<T2>>): Option<T2> {
        return task(_value);
    }

    function map<T2>(task: Function<T1, T2>): Some<T2> {
        return Some(task(_value));
    }

    function toResult(__: unknown): Ok<T1> {
        return Ok(_value);
    }
}
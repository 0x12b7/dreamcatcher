import type { Function } from "@root";
import type { Option } from "@root";
import { None } from "@root";
import { Ok } from "@root";

export type Some<T1> = {
    some(): this is Some<T1>;
    none(): this is None;
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
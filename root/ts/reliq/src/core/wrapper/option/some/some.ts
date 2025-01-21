import type { Function } from "@root";
import type { Option } from "@root";
import { None } from "@root";
import { Ok } from "@root";

export type Some<T1> = {

    /**
     * ***Brief***
     * `some` checks if the current instance is `Some`.
     */
    some(): this is Some<T1>;

    /**
     * ***Brief***
     * `none` checks if the current instance is `None`.
     */
    none(): this is None;

    /**
     * ***Brief***
     * `expect` terminates the program with `panic` when the `Option` is `None`.
     * 
     * ***Warning***
     * Reserved for unrecoverable errors, where a missing value will halt execution or result in a critical issue.
     */
    expect(__: unknown): T1;

    /**
     * ***Brief***
     * Safely retrieves the value, available only for `Some` after handling `None`.
     */
    unlock(): T1;

    /**
     * ***Brief***
     * Safely retrieves the `Some` or `fallback` value when `None`.
     */
    unlockOr(__: unknown): T1;

    /**
     * ***Brief***
     * `and` chains operations conditionally. 
     * 
     * ***Note***
     * If the current instance is `None`, subsequent operations are skipped and `None` is returned.
     */
    and<T2>(task: Function<T1, Option<T2>>): Option<T2>;

    /**
     * ***Brief***
     * `map` performs a no-op operation when the `Option` is `None`.
     */
    map<T2>(task: Function<T1, T2>): Some<T2>;

    /**
     * ***Brief***
     * `toResult` converts an `Option` into a `Result` with the `Err` result containing the provided error value.
     */
    toResult(__: unknown): Ok<T1>;
};

/**
 * ***Brief***
 * Represents a value that exists `Some` within an `Option`.
 */
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
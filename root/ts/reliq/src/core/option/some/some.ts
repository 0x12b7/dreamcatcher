import type { Function } from "@core";
import type { Option } from "@core";
import type { UnlockedWrapper } from "@core";
import type { Branded } from "@core";
import { None } from "@core";
import { Ok } from "@core";

export type Some<T1> = 
    & Branded<"Some">
    & UnlockedWrapper<T1>
    & {

    /**
     * ***Brief***
     * `some` checks if the current instance is `Some`.
     * 
     * ***Example***
     * ```ts
     *  let option: Option<200n>;
     *  if (option.some()) {
     *      let value: 200n = option.unlock();
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
     *  let option: Option<200n>;
     *  if (option.none()) {
     *      /// `Option` cannot `unlock` because it is `None`.
     *      /// ...
     *  }
     * ```
     */
    none(): this is None;

    /**
     * ***Brief***
     * `expect` terminates with `panic` if the `Option` is `None`.
     * 
     * ***Warning***
     * Reserved for debugging or unrecoverable errors.
     * 
     * ***Example***
     * ```ts
     *  let option: Option<200n>;
     *  let status: 200n = option.expect("This is unexpected and unrecoverable.");
     * ```
     */
    expect(__: unknown): T1;

    /**
     * ***Brief***
     * Retrieves the value of a `Some`, or falls back to the provided value if it’s `None`.
     * 
     * ***Example***
     * ```ts
     *  let option: Option<200n> = None;
     *  let status: 200n = option.unlockOr(200n);
     *  console.log(status); /// 200n.
     * ```
     */
    unlockOr(__: unknown): T1;

    /**
     * ***Brief***
     * Chains an task until the first `None` is encountered.
     * 
     * ***Example***
     * ```ts
     *  let option: Option<200n> = None;
     *  option
     *      .and(value => {
     *          /// Task is skipped because `Option` is `None`.
     *          /// ...
     *          return Some(value + 1n);
     *      })
     *      .and(value => {
     *          /// Task is skipped because `Option` is `None`.
     *          /// ...
     *      });
     * ```
     */
    and<T2>(task: Function<T1, Option<T2>>): Option<T2>;

    /**
     * ***Brief***
     * Transforms the `Some` value if present, but if this is already an `None`, it remains unchanged.
     * 
     * ***Example***
     * ```ts
     *  let option0: Option<200n> = Some(200n);
     *  let option1: Option<201n> = option.map(value => {
     *      /// Task is run because `Option` is `Some`.
     *      /// ...
     *      return value + 1n;
     *  });
     * ```
     */
    map<T2>(task: Function<T1, T2>): Some<T2>;

    /**
     * ***Brief***
     * Converts an `Option<T1>` to a `Result<T1, T2>`.
     * 
     * ***Example***
     * ```ts
     *  let option: Option<200n>;
     *  let result: Result<200n, 404n> = option.toResult(404n);
     * ```
     */
    toResult(__: unknown): Ok<T1>;
};

/**
 * ***Brief***
 * The value within an `Option`.
 */
export function Some<T1>(_value: T1): Some<T1> {
    /** @constructor */ {
        return {
            type,
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

    function type(): "Some" {
        return "Some";
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
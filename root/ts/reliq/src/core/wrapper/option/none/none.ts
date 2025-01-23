import type { Branded } from "@root";
import { Some } from "@root";
import { Err } from "@root";
import { Error } from "@root";
import { panic } from "@root";

export type None = 
    & Branded<"None">
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
    some(): this is Some<unknown>;

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
    expect(message: string): never;

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
    unlockOr<T2>(fallback: T2): T2;
    
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
    and(__: unknown): None;

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
    map(__: unknown): None;

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
    toResult<T1>(e: T1): Err<T1>;
};

/**
 * ***Brief***
 * The absence of a value or an "empty" state.
 * 
 * ***Warning***
 * Any operation attempting to access an `Option` must safely handle the `None` state or terminate with an error.
 */
export const None: None = (() => {
    let _this: None;

    /** @constructor */ {
        return _this = {
            type,
            some,
            none,
            expect,
            unlockOr,
            and,
            map,
            toResult
        };
    }

    function type(): "None" {
        return "None";
    }
    
    function some(): this is Some<unknown> {
        return false;
    }

    function none(): this is None {
        return true;
    }

    function expect(message: string): never {
        panic(Error("ERR_VALUE_REQUIRED", message));
    }

    function unlockOr<T1>(fallback: T1): T1 {
        return fallback;
    }

    function and(__: unknown): None {
        return _this;
    }

    function map(__: unknown): None {
        return _this;
    }

    function toResult<T1>(e: T1): Err<T1> {
        return Err(e);
    }
})();




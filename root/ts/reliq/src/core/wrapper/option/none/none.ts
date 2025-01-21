import { Some, StackTrace } from "@root";
import { Err } from "@root";
import { Error } from "@root";
import { panic } from "@root";

export type None = {

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
    some(): this is Some<unknown>;

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
    expect(message: string): never;

    /**
     * ***Brief***
     * Safely retrieves the `Some` or `fallback` value when `None`.
     * 
     * **Example**
     * ```ts
     *  let option: Option<200> = None;
     *  let status: number = option.unlockOr(404);
     *  console.log(status); /// 404.
     * ```
     */
    unlockOr<T2>(fallback: T2): T2;
    
    /**
     * ***Brief***
     * `and` chains operations conditionally. 
     * 
     * ***Note***
     * If the current instance is `None`, subsequent operations are skipped and `None` is returned.
     * 
     * ***Example***
     * ```ts
     *  let option: Option<200> = Some(200);
     *  option
     *      .and(status => {
     *          return None;
     *      })
     *      .and(() => {
     *          /// Not run because `Option` is `None`.
     *          /// ...
     *      });
     * ```
     */
    and(__: unknown): None;

    /**
     * ***Brief***
     * `map` performs a no-op operation when the `Option` is `None`.
     * 
     * ***Example***
     * ```ts
     *  let option: Option<200> = None;
     *  option.map(value => {
     *      /// Not run because `Option` is `None`.
     *      /// ...
     *  });
     * ```
     */
    map(__: unknown): None;

    /**
     * ***Brief***
     * `toResult` converts `None` into an `Err` result containing the provided error value.
     * 
     * ***Example***
     * ```ts
     *  let option: Option<200>;
     *  option
     *      .toResult("Something went wrong because ...")
     *      /// ...
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
            some,
            none,
            expect,
            unlockOr,
            and,
            map,
            toResult
        };
    }
    
    function some(): this is Some<unknown> {
        return false;
    }

    function none(): this is None {
        return true;
    }

    function expect(message: string): never {
        panic(Error({
            code: "ERR_INVALID_OPTION_STATE",
            message: Some([
                "\x1b[31m" + "Fatal Error: Attempted to unwrap `None`." + "\x1b[0m",
                "",
                "Attempted to unlock an `Option` but no value contained."
            ].join("\n")),
            payload: None,
            stack: Some(StackTrace(expect))
        }));
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

    function toResult<T1>(value: T1): Err<T1> {
        return Err(value);
    }
})();
import { StackTrace } from "@root";
import { Some } from "@root";
import { Err } from "@root";
import { Error } from "@root";
import { panic } from "@root";

export type None = {

    /**
     * ***Brief***
     * `some` checks if the current instance is `Some`.
     */
    some(): this is Some<unknown>;

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
    expect(message: string): never;

    /**
     * ***Brief***
     * Safely retrieves the `Some` or `fallback` value when `None`.
     */
    unlockOr<T2>(fallback: T2): T2;
    
    /**
     * ***Brief***
     * `and` chains operations conditionally. 
     * 
     * ***Note***
     * If the current instance is `None`, subsequent operations are skipped and `None` is returned.
     */
    and(__: unknown): None;

    /**
     * ***Brief***
     * `map` performs a no-op operation when the `Option` is `None`.
     */
    map(__: unknown): None;

    /**
     * ***Brief***
     * `toResult` converts an `Option` into a `Result` with the `Err` result containing the provided error value.
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
        panic(Error<"ERR_INVALID_OPTION_STATE">({
            code: "ERR_INVALID_OPTION_STATE",
            message: Some([
                message
            ].join("\N")),
            payload: None,
            stack: StackTrace(expect)
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

    function toResult<T1>(e: T1): Err<T1> {
        return Err(e);
    }
})();



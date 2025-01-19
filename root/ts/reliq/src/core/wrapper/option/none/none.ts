import type { AssertionError } from "@root";
import type { Serializable } from "@root";
import type { Displayable } from "@root";
import { Some, StackTrace } from "@root";
import { Err } from "@root";
import { Error as NativeError } from "@root";
import { panic } from "@root";

/**
 * **Note**
 * The absencee of a value or an "empty" state. The operation attempting to access the value
 * should safely handle or terminate with an error.
 */
export type None = 
    & Serializable
    & Displayable 
    & {

    /**
     * **Example**
     * ```ts
     *  None.some(); /// Always `false`.
     * ```
     */
    some(): this is Some<unknown>;

    /**
     * **Example**
     * ```ts
     *  None.none(); /// Always `true`.
     * ```
     */
    none(): this is None;
    
    /**
     * **Warning**
     * This method will cause a `panic` and terminate the program if called, as th state is `None`
     * and there is no value to recover. It serves as an explicit error handling mechanism.
     * 
     * **Warning**
     * You should call `expect` when you absolutely expect a value, but must not be `None`.
     * Calling `expect` on a `None` results in a program failure.
     * 
     * **Example**
     * ```ts
     *  None.expect("This should not have happened, something I thought was true about my program is wrong, and this is a bug.");
     * ```
     */
    expect(message: string): never;

    /**
     * 
     * **Example**
     * ```ts
     *  let statusO: Option<200>;
     *  let status: number = statusO.unwrapOr(404);
     * ```
     */
    unwrapOr<T2>(fallback: T2): T2;
    
    /**
     * **Note** Performs a no-op operation as there's no value to combine or logically `and`.
     * It returns the current `None` stat, representing that combining with `None` has no effect.
     * 
     * **Example**
     * ```ts
     *  let option: Option<200>;
     *  option
     *      .and(status => {
     *          /// ...
     *      })
     *      .and(() => {
     *          /// ...
     *      });
     * ```
     */
    and(__: unknown): None;


    map(__: unknown): None;

    toResult<T1>(value: T1): Err<T1>;
};

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
            toResult,
            toString,
            display
        };
    }
    
    function some(): this is Some<unknown> {
        return (false);
    }

    function none(): this is None {
        return (true);
    }

    function expect(message: string): never {
        let e: Error = Error();
        Error.captureStackTrace(e, expect);
        let assertionE: AssertionError = NativeError({
            code: "ERR_INVALID_ASSERTION",
            message: Some(
                "\n" + "Assertion Error:" +
                "\n" +
                "\n" + message +
                "\n" +
                "\n" + "An unrecoverable error has occured."
            ),
            payload: None,
            stack: Some(StackTrace())
        });
        panic(assertionE);
    }

    function unwrapOr<T1>(fallback: T1): T1 {
        return (fallback);
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

    function toString(): string {
        return "None";
    }

    function display(): void {
        return console.log(toString());
    }
})();
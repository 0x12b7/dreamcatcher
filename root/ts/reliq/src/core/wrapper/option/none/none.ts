import {
    type Branded,
    type RecoveryWrapper,
    type Serializable,
    type Displayable,
    Some,
    Err,
    panic
} from "@root";

/**
 * **Note**
 * The absencee of a value or an "empty" state. The operation attempting to access the value
 * should safely handle or terminate with an error.
 */
export type None = 
    & Branded<"None">
    & RecoveryWrapper<never>
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
        return (_this = {
            type,
            some,
            none,
            expect,
            unwrap,
            unwrapOr,
            and,
            map,
            toResult,
            toString,
            display
        });
    }
    function type(): "None" {
        return ("None");
    }
    
    function some(): this is Some<unknown> {
        return (false);
    }

    function none(): this is None {
        return (true);
    }

    function expect(message: string): never {
        panic(message, expect);
    }

    function unwrap(): never {
        panic(type());
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
        return type();
    }

    function display(): void {
        return console.log(toString());
    }
})();
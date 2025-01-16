import {
    type Branded,
    type ValidatedWrapper,
    type Serializable,
    type Displayable,
    type Function,
    type Option,
    type Result,
    StringHandler,
    Some,
    Err,
    panic
} from "@root";

export type Ok<T1> = 
    & Branded<"Ok">
    & ValidatedWrapper<T1>
    & Serializable
    & Displayable
    & {
    ok(): this is Ok<T1>;
    err(): this is Err<unknown>;
    expect(__: unknown): T1;
    expectErr(__: unknown): never;
    unwrapOr(__: unknown): T1;
    and<T2>(operation: Function<T1, Ok<T2>>): Ok<T2>;
    and<T2>(operation: Function<T1, Err<T2>>): Result<T1, T2>;
    and<T2, T3>(operation: Function<T1, Result<T2, T3>>): Result<T2, T3>;
    map<T2>(operation: Function<T1, T2>): Ok<T2>;
    mapErr(__: unknown): Ok<T1>;
    restore(__: unknown): Ok<T1>;
    
    /**
     * 
     * 
     * **Example**
     * ```
     *  let result: Result<200, 404>
     *      .toOption()
     *      .unwrap();
     * ```
     */
    toOption(): Option<T1>;
};

export function Ok<T1>(_value: T1): Ok<T1> {
    let _this: Ok<T1>;

    /** @constructor */ {
        return _this = {
            type,
            ok,
            err,
            expect,
            expectErr,
            unwrap,
            unwrapOr,
            unwrapSafely,
            and,
            map,
            mapErr,
            restore,
            toOption,
            toString,
            display
        };
    }

    function type(): "Ok" {
        return "Ok";
    }

    function ok(): this is Ok<T1> {
        return true;
    }

    function err(): this is Err<unknown> {
        return false;
    }

    function expect(__: unknown): T1 {
        return _value;
    }

    function expectErr(message: string): never {
        panic(message, expectErr);
    }

    function unwrap(): T1 {
        return _value;
    }

    function unwrapOr(__: unknown): T1 {
        return _value;
    }

    function unwrapSafely(): T1 {
        return _value;
    }

    function and<T2>(operation: Function<T1, Ok<T2>>): Ok<T2>;
    function and<T2>(operation: Function<T1, Err<T2>>): Result<T1, T2>;
    function and<T2, T3>(operation: Function<T1, Result<T2, T3>>): Result<T2, T3>;
    function and<T2, T3>(operation: Function<T1, Result<T2, T3>>): Result<T2, T3> {
        return operation(_value);
    }

    function map<T2>(operation: Function<T1, T2>): Ok<T2> {
        return Ok(operation(_value));
    }

    function mapErr(__: unknown): Ok<T1> {
        return _this;
    }

    function restore(__: unknown): Ok<T1> {
        return _this;
    }

    function toOption(): Option<T1> {
        return Some(_value);
    }

    function toString(): string {
        return type() + "(" + StringHandler().toString(_value) + ")";
    }

    function display(): void {
        return console.log(toString());
    }
}
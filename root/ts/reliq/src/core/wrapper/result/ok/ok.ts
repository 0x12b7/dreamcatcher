import type { Serializable } from "@root";
import type { Displayable } from "@root";
import type { Function } from "@root";
import type { Option } from "@root";
import type { Result } from "@root";
import { Error, None, StackTrace } from "@root";
import { panic, Some } from "@root";
import { Err } from "@root";
import { toString as toString0 } from "@root";

export type Ok<T1> =
    & Serializable
    & Displayable
    & {
    ok(): this is Ok<T1>;
    err(): this is Err<unknown>;
    expect(__: unknown): T1;
    expectErr(__: unknown): never;
    unwrap(): T1;
    unwrapOr(__: unknown): T1;
    recover(__: unknown): Ok<T1>;
    and<T2>(task: Function<T1, Ok<T2>>): Ok<T2>;
    and<T2>(task: Function<T1, Err<T2>>): Result<T1, T2>;
    and<T2, T3>(task: Function<T1, Result<T2, T3>>): Result<T2, T3>;
    map<T2>(task: Function<T1, T2>): Ok<T2>;
    mapErr(__: unknown): Ok<T1>;
    toOption(): Option<T1>;
};

export function Ok<T1>(_value: T1): Ok<T1> {
    let _this: Ok<T1>;

    /** @constructor */ {
        return _this = {
            ok,
            err,
            expect,
            expectErr,
            unlock,
            unlockOr,
            and,
            map,
            mapErr,
            recover,
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
        panic(Error({
            code: "",
            message: Some([
                message
            ].join("\n")),
            payload: None,
            stack: Some(StackTrace(expectErr))
        }));
    }

    function unlock(): T1 {
        return _value;
    }

    function unlockOr(__: unknown): T1 {
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

    function recover(__: unknown): Ok<T1> {
        return _this;
    }

    function toOption(): Option<T1> {
        return Some(_value);
    }

    function toString(): string {
        return type() + "(" + toString0(_value) + ")";
    }

    function display(): void {
        return console.log(toString());
    }
}




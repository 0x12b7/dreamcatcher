import type { Serializable } from "@root";
import type { Displayable } from "@root";
import type { Function } from "@root";
import type { Option } from "@root";
import type { Result } from "@root";
import { Some } from "@root";
import { Ok } from "@root";
import { None } from "@root";
import { toString as toString0 } from "@root";

/// unlock is not available use expect or inspect

export type Err<T1> = 
    & Serializable
    & Displayable
    & {
    ok(): this is Ok<unknown>;
    err(): this is Err<T1>;
    inspect(): T1;
    stack(): string;
    expect(message: string): never;
    expectErr(__: unknown): T1;
    unlockOr<T2>(fallback: T2): T2;
    and(__: unknown): Err<T1>;
    map(__: unknown): Err<T1>;
    mapErr<T2>(operation: Function<T1, T2>): Err<T2>;
    recover<T2>(operation: Function<T1, T2>): Ok<T2>;
    toOption(): Option<never>;
};

export function Err<T1>(_value: T1): Err<T1> {
    let _this: Err<T1>;
    let _stack: string;
    
    /** @constructor */ {
        let e: Error = Error();
        Error.captureStackTrace(e, Err);
        _stack = e.stack ?? "";
        return _this = {
            ok,
            err,
            inspect,
            stack,
            expect,
            expectErr,
            unwrapOr,
            and,
            map,
            mapErr,
            recover,
            toOption,
            toString,
            display
        };
    }

    function ok(): this is Ok<unknown> {
        return false;
    }

    function err(): this is Err<T1> {
        return true;
    }

    function inspect(): T1 {
        return _value;
    }

    function stack(): string {
        return _stack;
    }

    function expect(message: string): never {
        throw message + "\n" + stack();
    }

    function expectErr(__: unknown): T1 {
        return inspect();
    }

    function unwrapOr<T2>(alternative: T2): T2 {
        return alternative;
    }

    function and(__: unknown): Err<T1> {
        return _this;
    }

    function map(__: unknown): Err<T1> {
        return _this;
    }

    function mapErr<T2>(operation: Function<T1, T2>): Err<T2> {
        return Err(operation(inspect()));
    }

    function recover<T2>(operation: Function<T1, T2>): Ok<T2> {
        return Ok(operation(inspect()));
    }

    function toOption(): Option<never> {
        return None;
    }

    function toString(): string {
        return "Err" + "(" + toString0(inspect()) + ")" + "\n" + stack();
    }

    function display(): void {
        return console.log(toString());
    }
}
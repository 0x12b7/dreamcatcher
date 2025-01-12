import type { Function } from "@core";
import type { Branded } from "@core";
import type { Option } from "@core";
import { Ok } from "@core";
import { None } from "@core";
import { toString as toStringUtil } from "@core";
import { panic } from "@core";

export type Err<T1> =
    & Branded<"Err">
    & {
    ok(): this is Ok<unknown>;
    err(): this is Err<T1>;
    val(): T1;
    stack(): string;
    expect(message: string): never;
    expectErr(__: unknown): T1;
    unwrap(): never;
    unwrapOr<T2>(alternative: T2): T2;
    and(__: unknown): Err<T1>;
    map(__: unknown): Err<T1>;
    mapErr<T2>(operation: Function<T1, T2>): Err<T2>;
    toOption(): Option<never>;
    toString(): string;
};

export function Err<T1>(_value: T1): Err<T1> {
    let _this: Err<T1>;
    let _stack: string;
    
    /** @constructor */ {
        let e: Error = Error();
        Error.captureStackTrace(e, Err);
        _stack = e.stack ?? "";
        return _this = {
            type,
            ok,
            err,
            val,
            stack,
            expect,
            expectErr,
            unwrap,
            unwrapOr,
            and,
            map,
            mapErr,
            toOption,
            toString
        };
    }

    function type(): "Err" {
        return "Err";
    }

    function ok(): this is Ok<unknown> {
        return false;
    }

    function err(): this is Err<T1> {
        return true;
    }

    function val(): T1 {
        return _value;
    }

    function stack(): string {
        return _stack;
    }

    function expect(message: string): never {
        throw message + "\n" + stack();
    }

    function expectErr(__: unknown): T1 {
        return val();
    }

    function unwrap(): never {
        throw val() + "\n" + stack();
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
        return Err(operation(val()));
    }

    function toOption(): Option<never> {
        return None;
    }

    function toString(): string {
        return type() + "(" + toStringUtil(val()) + ")" + "\n" + stack();
    }
}
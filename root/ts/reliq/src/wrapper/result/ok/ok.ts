import type { Function } from "@root";
import type { Result } from "@root";
import type { Option } from "@root";
import type { ResultAndOptionBrandToWrapperMap } from "@root";
import type { Err } from "@root";
import { Some } from "@root";
import { panic } from "@root";
import { toString as toStringUtil } from "@root";

export type Ok<T1> = ResultAndOptionBrandToWrapperMap<"Ok", T1>;

export function Ok<T1>(_value: T1): Ok<T1> {
    let _this: Ok<T1>;

    /** @constructor */ {
        return _this = {
            type,
            ok,
            err,
            val,
            expect,
            expectErr,
            unwrap,
            unwrapOr,
            unwrapSafely,
            and,
            map,
            mapErr,
            toOption,
            toString
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

    function val(): T1 {
        return _value;
    }

    function expect(__: unknown): T1 {
        return val();
    }

    function expectErr(message: string): never {
        return panic(message, expectErr);
    }

    function unwrap(): T1 {
        return val();
    }

    function unwrapOr(__: unknown): T1 {
        return val();
    }

    function unwrapSafely(): T1 {
        return val();
    }

    function and<T2>(operation: Function<T1, Ok<T2>>): Ok<T2>;
    function and<T2>(operation: Function<T1, Err<T2>>): Result<T1, T2>;
    function and<T2, T3>(operation: Function<T1, Result<T2, T3>>): Result<T2, T3>;
    function and<T2, T3>(operation: Function<T1, Result<T2, T3>>): Result<T2, T3> {
        return operation(val());
    }

    function map<T2>(operation: Function<T1, T2>): Ok<T2> {
        return Ok(operation(val()));
    }

    function mapErr(__: unknown): Ok<T1> {
        return _this;
    }

    function toOption(): Option<T1> {
        return Some(val());
    }

    function toString(): string {
        return type() + "(" + toStringUtil(val()) + ")";
    }
}
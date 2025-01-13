import type { Function } from "@root";
import type { Result } from "@root";
import type { Option } from "@root";
import type { Branded } from "@root";
import { Err } from "@root";
import { Some } from "@root";
import { panic } from "@root";
import { toString as toString_ } from "@root";

export type Ok<T1> = 
    & Branded<"OK">
    & {
    ok(): this is Ok<T1>;
    err(): this is Err<unknown>;
    val(): T1;
    expect(__: unknown): T1;
    expectErr(msg: string): never;
    unwrap(): T1;
    unwrapOr(__: unknown): T1;
    unwrapSafely(): T1;
    andThen<T2>(op: Function<T1, Ok<T2>>): Ok<T2>;
    andThen<T2>(op: Function<T1, Err<T2>>): Result<T1, T2>;
    andThen<T2, T3>(op: Function<T1, Result<T2, T3>>): Result<T2, T3>;
    andThen<T2, T3>(op: Function<T1, Result<T2, T3>>): Result<T2, T3>;
    map<T2>(op: Function<T1, T2>): Ok<T2>;
    mapErr(__: unknown): Ok<T1>;
    toOption(): Option<T1>;
    toString(): string;
};

export function Ok<T1>(_v: T1): Ok<T1> {
    let _instance: Ok<T1>;

    /** @constructor */ {
        _instance = {
            type,
            ok,
            err,
            val,
            expect,
            expectErr,
            unwrap,
            unwrapOr,
            unwrapSafely,
            andThen,
            map,
            mapErr,
            toOption,
            toString
        };
        return _instance;
    }

    function type(): "OK" {
        return "OK";
    }

    function ok(): this is Ok<T1> {
        return true;
    }

    function err(): this is Err<unknown> {
        return false;
    }

    function val(): T1 {
        return _v;
    }

    function expect(__: unknown): T1 {
        return val();
    }

    function expectErr(msg: string): never {
        return panic(msg);
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

    function andThen<T2>(op: Function<T1, Ok<T2>>): Ok<T2>;
    function andThen<T2>(op: Function<T1, Err<T2>>): Result<T1, T2>;
    function andThen<T2, T3>(op: Function<T1, Result<T2, T3>>): Result<T2, T3>;
    function andThen<T2, T3>(op: Function<T1, Result<T2, T3>>): Result<T2, T3> {
        return op(val());
    }

    function map<T2>(op: Function<T1, T2>): Ok<T2> {
        return Ok(op(val()));
    }

    function mapErr(__: unknown): Ok<T1> {
        return _instance;
    }

    function toOption(): Option<T1> {
        return Some(val());
    }

    function toString(): string {
        return `Ok(${ toString_(val()) })`;
    }
}
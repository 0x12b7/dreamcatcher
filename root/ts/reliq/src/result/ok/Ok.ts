import type { Function } from "@root";
import type { Result } from "@root";
import type { Option } from "@root";
import { Err } from "@root";
import { Some } from "@root";
import { panic } from "@root";
import { toString as toString_ } from "@root";

export type Ok<T> = {
    ok(): this is Ok<T>;
    err(): this is Err<unknown>;
    val(): T;
    expect(__: unknown): T;
    expectErr(msg: string): never;
    unwrap(): T;
    unwrapOr(__: unknown): T;
    unwrapSafely(): T;
    andThen<X>(op: Function<T, Ok<X>>): Ok<X>;
    andThen<X>(op: Function<T, Err<X>>): Result<T, X>;
    andThen<X, Y>(op: Function<T, Result<X, Y>>): Result<X, Y>;
    andThen<X, Y>(op: Function<T, Result<X, Y>>): Result<X, Y>;
    map<X>(op: Function<T, X>): Ok<X>;
    mapErr(__: unknown): Ok<T>;
    toOption(): Option<T>;
    toString(): string;
};

export function Ok<T>(_v: T): Ok<T> {
    let _instance: Ok<T>;

    /** @constructor */ {
        _instance = {
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

    function ok(): this is Ok<T> {
        return true;
    }

    function err(): this is Err<unknown> {
        return false;
    }

    function val(): T {
        return _v;
    }

    function expect(__: unknown): T {
        return val();
    }

    function expectErr(msg: string): never {
        return panic(msg);
    }

    function unwrap(): T {
        return val();
    }

    function unwrapOr(__: unknown): T {
        return val();
    }

    function unwrapSafely(): T {
        return val();
    }

    function andThen<X>(op: Function<T, Ok<X>>): Ok<X>;
    function andThen<X>(op: Function<T, Err<X>>): Result<T, X>;
    function andThen<X, Y>(op: Function<T, Result<X, Y>>): Result<X, Y>;
    function andThen<X, Y>(op: Function<T, Result<X, Y>>): Result<X, Y> {
        return op(val());
    }

    function map<X>(op: Function<T, X>): Ok<X> {
        return Ok(op(val()));
    }

    function mapErr(__: unknown): Ok<T> {
        return _instance;
    }

    function toOption(): Option<T> {
        return Some(val());
    }

    function toString(): string {
        return `Ok(${ toString_(val()) })`;
    }
}
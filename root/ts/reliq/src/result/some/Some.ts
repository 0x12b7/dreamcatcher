import type { Function } from "@root";
import type { Option } from "@root";
import { None } from "@root";
import { Ok } from "@root";
import { toString as toString_ } from "@root";

export type Some<T> = {
    some(): this is Some<T>;
    none(): this is None;
    val(): T;
    expect(__: unknown): T;
    unwrap(): T;
    unwrapOr(__: unknown): T;
    unwrapSafely(): T;
    andThen<X>(op: Function<T, Option<X>>): Option<X>;
    map<X>(op: Function<T, X>): Some<X>;
    toResult<E>(e: E): Ok<T>;
    toString(): string;
};

export function Some<T>(_v: T): Some<T> {
    /** @constructor */ {
        return { 
            some, 
            none, 
            val, 
            expect, 
            unwrap, 
            unwrapOr,
            unwrapSafely,
            andThen,
            map,
            toResult,
            toString
        };
    }

    function some(): this is Some<T> {
        return true;
    }

    function none(): this is None {
        return false;
    }

    function val(): T {
        return _v;
    }

    function expect(__: unknown): T {
        return val();
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

    function andThen<X>(op: Function<T, Option<X>>): Option<X> {
        return op(val());
    }

    function map<X>(op: Function<T, X>): Some<X> {
        return Some(op(val()));
    }

    function toResult<E>(e: E): Ok<T> {
        return Ok(val());
    }

    function toString(): ReturnType<Some<T>["toString"]> {
        return `Some(${ toString_(val()) })`;
    }
}
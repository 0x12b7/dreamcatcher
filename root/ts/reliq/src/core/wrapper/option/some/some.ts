import type { Function } from "@core";
import type { Branded } from "@core"
import type { Option } from "@core";
import { None } from "@core";
import { Ok } from "@core";
import { toString as toStringUtil } from "@core";

export type Some<T1> =
    & Branded<"Some">
    & {
    some(): this is Some<T1>;
    none(): this is None;
    value(): T1;
    expect(__: unknown): T1;
    unwrap(): T1;
    unwrapOr(__: unknown): T1;
    unwrapSafely(): T1;
    and<T2>(op: Function<T1, Option<T2>>): Option<T2>;
    map<T2>(op: Function<T1, T2>): Some<T2>;
    toResult(__: unknown): Ok<T1>;
    toString(): string;
};

export function Some<T1>(_value: T1): Some<T1> {
    /** @constructor */ {
        return {
            type,
            some,
            none,
            value,
            expect,
            unwrap,
            unwrapOr,
            unwrapSafely,
            and,
            map,
            toResult,
            toString
        };
    }

    function type(): "Some" {
        return "Some";
    }

    function some(): this is Some<T1> {
        return true;
    }

    function none(): this is None {
        return false;
    }

    function value(): T1 {
        return _value;
    }

    function expect(__: unknown): T1 {
        return value();
    }

    function unwrap(): T1 {
        return value();
    }

    function unwrapOr(__: unknown): T1 {
        return value();
    }

    function unwrapSafely(): T1 {
        return value();
    }

    function and<T2>(operation: Function<T1, Option<T2>>): Option<T2> {
        return operation(value());
    }

    function map<T2>(operation: Function<T1, T2>): Some<T2> {
        return Some(operation(value()));
    }

    function toResult(__: unknown): Ok<T1> {
        return Ok(value());
    }

    function toString(): string {
        return type() + "(" + toStringUtil(value()) + ")";
    }
}
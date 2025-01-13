import type { Function } from "@root";
import type { Option } from "@root";
import type { ResultAndOptionBrandToWrapperMap } from "@root";
import { None } from "@root";
import { Ok } from "@root";
import { toString as toStringUtil } from "@root";

export type Some<T1> = ResultAndOptionBrandToWrapperMap<"Some", T1>;

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
            toString,
            display
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

    function display(): void {
        return console.log(toString());
    }
}
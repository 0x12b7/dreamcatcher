import type { Branded } from "@root";
import type { ValidatedWrapper } from "@root";
import type { Serializable } from "@root";
import type { Displayable } from "@root";
import type { Function } from "@root";
import type { Option } from "@root";
import { None } from "@root";
import { Ok } from "@root";
import { toString as $toString } from "@root";

type Some<T1> =
    & Branded<"Some">
    & ValidatedWrapper<T1>
    & Serializable
    & Displayable
    & {
    some(): this is Some<T1>;
    none(): this is None;
    expect(__: unknown): T1;
    unwrapOr(__: unknown): T1;
    and<T2>(operation: Function<T1, Option<T2>>): Option<T2>;
    map<T2>(operation: Function<T1, T2>): Some<T2>;
    toResult(__: unknown): Ok<T1>;
};

function Some<T1>(_value: T1): Some<T1> {
    /** @constructor */ {
        return {
            type,
            some,
            none,
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

    function expect(__: unknown): T1 {
        return _value;
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

    function and<T2>(operation: Function<T1, Option<T2>>): Option<T2> {
        return operation(_value);
    }

    function map<T2>(operation: Function<T1, T2>): Some<T2> {
        return Some(operation(_value));
    }

    function toResult(__: unknown): Ok<T1> {
        return Ok(_value);
    }

    function toString(): string {
        return type() + "(" + $toString(_value) + ")";
    }

    function display(): void {
        return console.log(toString());
    }
}

export { Some };
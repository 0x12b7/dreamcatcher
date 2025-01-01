import type { Function } from "@root";
import type { Option } from "@root";
import { None } from "@root";
import { Ok } from "@root";
import { toString as toString_ } from "@root";

export type Err<E> = {
    ok(): this is Ok<unknown>;
    err(): this is Err<E>;
    val(): E;
    stack(): string;
    expect(msg: string): never;
    expectErr(__: unknown): E;
    unwrap(): never;
    unwrapOr<X>(v: X): X;
    andThen(__: unknown): Err<E>;
    map(__: unknown): Err<E>;
    mapErr<X>(op: Function<E, X>): Err<X>;
    toOption(): Option<never>;
    toString(): string;
};

export function Err<E>(_v: E): Err<E> {
    let _instance: Err<E>;
    let _stack: string;

    /** @constructor */ {
        _instance = {
            ok,
            err,
            val,
            stack,
            expect,
            expectErr,
            unwrap,
            unwrapOr,
            andThen,
            map,
            mapErr,
            toOption,
            toString
        };
        let content: Array<string> = Error().stack!.split("\n").slice(2);
        let match: boolean =
            content
            && content.length > 0
            && content[0].includes("Err");
        if (match) content.shift();
        _stack = content.join("\n");
        return _instance;
    }

    function ok(): this is Ok<unknown> {
        return false;
    }

    function err(): this is Err<E> {
        return true;
    }

    function val(): E {
        return _v;
    }

    function stack(): string {
        return _stack;
    }

    function expect(msg: string): never {
        throw `${ msg }\n${ stack() }`;
    }

    function expectErr(__: unknown): E {
        return val();
    }

    function unwrap(): never {
        throw `${ val() }\n${ stack() }`;
    }

    function unwrapOr<X>(v: X): X {
        return v;
    }

    function andThen(__: unknown): Err<E> {
        return _instance;
    }

    function map(__: unknown): Err<E> {
        return _instance;
    }

    function mapErr<X>(op: Function<E, X>): Err<X> {
        return Err(op(val()));
    }

    function toOption(): Option<never> {
        return None;
    }

    function toString(): string {
        return `Err(${ toString_(val()) })`;
    }
}
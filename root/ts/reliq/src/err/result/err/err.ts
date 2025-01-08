import type { Function } from "@root";
import type { Option } from "@root";
import { None } from "@root";
import { Ok } from "@root";
import { toString as toString_ } from "@root";

export type Err<T1> = {
    ok(): this is Ok<unknown>;
    err(): this is Err<T1>;
    val(): T1;
    stack(): string;
    expect(msg: string): never;
    expectErr(__: unknown): T1;
    unwrap(): never;
    unwrapOr<T2>(v: T2): T2;
    andThen(__: unknown): Err<T1>;
    map(__: unknown): Err<T1>;
    mapErr<T2>(op: Function<T1, T2>): Err<T2>;
    toOption(): Option<never>;
    toString(): string;
};

export function Err<T1>(_v: T1): Err<T1> {
    let _instance: Err<T1>;
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

    function err(): this is Err<T1> {
        return true;
    }

    function val(): T1 {
        return _v;
    }

    function stack(): string {
        return _stack;
    }

    function expect(msg: string): never {
        throw `${ msg }\n${ stack() }`;
    }

    function expectErr(__: unknown): T1 {
        return val();
    }

    function unwrap(): never {
        throw `${ val() }\n${ stack() }`;
    }

    function unwrapOr<T2>(v: T2): T2 {
        return v;
    }

    function andThen(__: unknown): Err<T1> {
        return _instance;
    }

    function map(__: unknown): Err<T1> {
        return _instance;
    }

    function mapErr<T2>(op: Function<T1, T2>): Err<T2> {
        return Err(op(val()));
    }

    function toOption(): Option<never> {
        return None;
    }

    function toString(): string {
        return `Err(${ toString_(val()) })`;
    }
}
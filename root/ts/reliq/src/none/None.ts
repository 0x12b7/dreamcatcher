import { Some } from "@root";
import { Err } from "@root";

export type None = {
    some(): this is Some<unknown>;
    none(): this is None;
    expect(msg: string): never;
    unwrap(): never;
    unwrapOr<X>(v: X): X;
    andThen(__: unknown): None;
    map(__: unknown): None;
    toResult<E>(e: E): Err<E>;
    toString(): string;
};

export const None: None = (() => {
    let _instance: None;

    /** @constructor */ {
        _instance = {
            some,
            none,
            expect,
            unwrap,
            unwrapOr,
            andThen,
            map,
            toResult,
            toString
        };
        return _instance;
    }

    function some(): this is Some<unknown> {
        return false;
    }

    function none(): this is None {
        return true;
    }

    function expect(msg: string): never {
        throw `${ msg }`;
    }

    function unwrap(): never {
        throw `${ "NONE" }\n${ Error().stack }`;
    }

    function unwrapOr<X>(v: X): X {
        return v;
    }

    function andThen(__: unknown): None {
        return _instance;
    }

    function map(__: unknown): None {
        return _instance;
    }

    function toResult<E>(e: E): Err<E> {
        return Err(e);
    }

    function toString(): string {
        return "NONE";
    }
})();
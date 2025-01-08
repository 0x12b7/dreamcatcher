import { Some } from "@root";
import { Err } from "@root";

export type None = {
    some(): this is Some<unknown>;
    none(): this is None;
    expect(msg: string): never;
    unwrap(): never;
    unwrapOr<T1>(v: T1): T1;
    andThen(__: unknown): None;
    map(__: unknown): None;
    toResult<T1>(e: T1): Err<T1>;
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

    function unwrapOr<T1>(v: T1): T1 {
        return v;
    }

    function andThen(__: unknown): None {
        return _instance;
    }

    function map(__: unknown): None {
        return _instance;
    }

    function toResult<T1>(e: T1): Err<T1> {
        return Err(e);
    }

    function toString(): string {
        return "None";
    }
})();
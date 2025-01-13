import type { Branded } from "@root";
import type { RecoveryWrapper } from "@root";
import type { Serializable } from "@root";
import type { Displayable } from "@root";
import { Some } from "@root";
import { Err } from "@root";
import { panic } from "@root";

type None = 
    & Branded<"None">
    & RecoveryWrapper<never>
    & Serializable
    & Displayable 
    & {
    some(): this is Some<unknown>;
    none(): this is None;
    expect(message: string): never;
    and(__: unknown): None;
    map(__: unknown): None;
    toResult<T1>(value: T1): Err<T1>;
};

const None: None = (() => {
    let _this: None;

    /** @constructor */ {
        return _this = {
            type,
            some,
            none,
            expect,
            unwrap,
            unwrapOr,
            and,
            map,
            toResult,
            toString,
            display
        };
    }
    function type(): "None" {
        return "None";
    }
    
    function some(): this is Some<unknown> {
        return false;
    }

    function none(): this is None {
        return true;
    }

    function expect(message: string): never {
        panic(message, expect);
    }

    function unwrap(): never {
        panic(type());
    }

    function unwrapOr<T1>(fallback: T1): T1 {
        return fallback;
    }

    function and(__: unknown): None {
        return _this;
    }

    function map(__: unknown): None {
        return _this;
    }

    function toResult<T1>(value: T1): Err<T1> {
        return Err(value);
    }

    function toString(): string {
        return type();
    }

    function display(): void {
        return console.log(toString());
    }
})();

export { None };
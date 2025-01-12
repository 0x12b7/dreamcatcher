import type { Function } from "@root";
import type { Option } from "@root";
import type { ResultAndOptionBrandToWrapperMap } from "@root";
import { Ok } from "@root";
import { None } from "@root";
import { toString as toStringUtil } from "@root";
import { isOption } from "@root";

export type Err<T1> = ResultAndOptionBrandToWrapperMap<"Err", T1>;

export function Err<T1>(_value: T1): Err<T1> {
    let _this: Err<T1>;
    let _stack: string;
    
    /** @constructor */ {
        let e: Error = Error();
        Error.captureStackTrace(e, Err);
        _stack = e.stack ?? "";
        return _this = {
            type,
            ok,
            err,
            val,
            stack,
            expect,
            expectErr,
            unwrap,
            unwrapOr,
            and,
            map,
            mapErr,
            toOption,
            toString
        };
    }

    function type(): "Err" {
        return "Err";
    }

    function ok(): this is Ok<unknown> {
        return false;
    }

    function err(): this is Err<T1> {
        return true;
    }

    function val(): T1 {
        return _value;
    }

    function stack(): string {
        return _stack;
    }

    function expect(message: string): never {
        throw message + "\n" + stack();
    }

    function expectErr(__: unknown): T1 {
        return val();
    }

    function unwrap(): never {
        let value0: unknown = val();
        if (
            value0 !== null
            && value0 !== undefined
            && typeof value0 === "object"
            && "code" in value0
            && "message" in value0
            && isOption(value0.message)
        ) {
            let value1: {
                code: string;
                message: Option<unknown>,
                payload: Option<unknown>
            } = value0 as any;
            if (value1.message.some()) throw value1.code + ":" + " " + value1.message.unwrapOr("") + "\n" + stack();
            throw value1.code + "\n" + stack();
        }
        throw toStringUtil(val()) + "\n" + stack();
    }

    function unwrapOr<T2>(alternative: T2): T2 {
        return alternative;
    }

    function and(__: unknown): Err<T1> {
        return _this;
    }

    function map(__: unknown): Err<T1> {
        return _this;
    }

    function mapErr<T2>(operation: Function<T1, T2>): Err<T2> {
        return Err(operation(val()));
    }

    function toOption(): Option<never> {
        return None;
    }

    function toString(): string {
        return type() + "(" + toStringUtil(val()) + ")" + "\n" + stack();
    }
}
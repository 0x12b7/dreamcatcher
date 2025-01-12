import type { ResultAndOptionBrandToWrapperMap } from "@root";
import { Some } from "@root";
import { Err } from "@root";

export type None = ResultAndOptionBrandToWrapperMap<"None", never>;

export const None: None = (() => {
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
            toString
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
        let e: Error = Error(message);
        Error.captureStackTrace(e, expect);
        if (e.stack) throw message + "\n" + e.stack;
        throw message;
    }

    function unwrap(): never {
        let e: Error = Error();
        Error.captureStackTrace(e, unwrap);
        if (e.stack) throw type() + "\n" + e.stack;
        throw type();
    }

    function unwrapOr<T1>(alternative: T1): T1 {
        return alternative;
    }

    function and(__: unknown): None {
        return _this;
    }

    function map(__: unknown): None {
        return _this;
    }

    function toResult<T1>(e: T1): Err<T1> {
        return Err(e);
    }

    function toString(): string {
        return type();
    }
})();
import type { Branded } from "@core";
import { Some } from "@core";
import { Err } from "@core";

export type None =
    & Branded<"None">
    & {

    /**
     * @example
     *  let option: Option<string> = Some("Hello World");
     *  if (option.some()) {
     *      /// TypeScript now knows that the value is
     *      /// present.
     *      console.log(option.unwrapSafely());
     *  }
     */
    some(): this is Some<unknown>;
    none(): this is None;
    expect(message: string): never;
    unwrap(): never;
    unwrapOr<T1>(alternative: T1): T1;
    and(__: unknown): None;
    map(__: unknown): None;
    toResult<T1>(e: T1): Err<T1>;

    /**
     * @example
     *  console.log(none.toString()); /// None
     */
    toString(): string;
};

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
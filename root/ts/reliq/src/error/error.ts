import { BrandedStruct, type Closure } from "@root";
import { Option } from "@root";
import { Some } from "@root";
import { None } from "@root";
import { flag } from "@root";

const _Error0: ErrorConstructor = globalThis.Error;

export type Error<T1 extends string, T2 = unknown> = 
    & BrandedStruct<"Error">
    & {

    /**
     * ***Brief***
     * The unique identifier for this error.
     */
    code: T1;

    /**
     * ***Brief***
     * A human-readable message that explains the nature of the error.
     */
    message: Option<string>;

    /**
     * ***Brief***
     * An optional value that can hold additional data or context related to the error.
     */
    payload: Option<T2>;

    /**
     * ***Brief***
     * The stack trace associated with the error.
     */
    stack: string;
};

/**
 * ***Brief***
 * A custom error with an optional message and payload for strongly-typed errors.
 * 
 * ***Note***
 * This is a general-purpose error structure to manage domain-specific error codes and provide better context.
 */
export function Error<T1 extends string, T2 = unknown>(_configuration: Error.Configuration<T1, T2>): Error<T1, T2>;
export function Error<T1 extends string, T2 = unknown>(_code: T1, _message?: string, _payload?: T2): Error<T1, T2>;
export function Error<T1 extends string, T2 = unknown>(
    _p0: Error.Configuration<T1, T2> | T1,
    _p1?: string,
    _p2?: T2
): Error<T1, T2> {
    /** @constructor */ {
        if (typeof _p0 === "object") {
            let configuration: Error.Configuration<T1, T2> = _p0;
            let handler: Error.Handler = flag(configuration.handler).unwrapOr(Error.Handler);
            return {
                type: "Error",
                code: configuration.code,
                message: flag(configuration.message),
                payload: flag(configuration.payload),
                stack: flag(configuration.stack).unwrapOr(handler.localStackTrace(Error).unwrapOr(""))
            };
        }
        return {
            type: "Error",
            code: _p0,
            message: flag(_p1),
            payload: flag(_p2),
            stack: Error.Handler.localStackTrace(Error).unwrapOr("")
        };
    }
}

export namespace Error {
    export type Configuration<T1 extends string, T2 = unknown> = {
        code: T1;
        message?: string;
        payload?: T2;
        stack?: string;
        handler?: Error.Handler;
    };

    export type Handler = {
        match(unknown: unknown): unknown is Error<any, unknown>;
        match(unknown: unknown, task: Closure<[e: Error<any, unknown>], void>): unknown is Error<any, unknown>;
        match<T1 extends string>(unknown: unknown, code: T1): unknown is Error<T1, unknown>;
        match<T1 extends string>(unknown: unknown, code: T1, task: Closure<[e: Error<T1, unknown>], void>): unknown is Error<T1, unknown>;

        /**
         * ***Brief***
         * `panic` throws an error with optional message and stack trace location.
         * 
         * ***Example***
         * ```ts
         *  panic(Error("MATH.ERR_DIVISION_BY_ZERO"));
         *  panic(Error({
         *      code: "MATH.ERR_DIVISION_BY_ZERO",
         *      message: Some("Math: Cannot divide by zero."),
         *      payload: None,
         *      stack: StackTrace(...)
         *  }));
         *  panic("An unrecoverable error has occured.");
         * ```
         */
        panic<T1 extends string>(e: Error<T1>, handler?: Handler): never;
        panic<T1 extends string>(code: T1, at?: Function, handler?: Handler): never;
        localStackTrace(at: Function): Option<string>;
    };

    export const Handler: Handler = (() => {
        let _this: Handler;

        /** @constructor */ {
            return _this = { match, panic, localStackTrace };
        }

        function match(unknown: unknown): unknown is Error<any, unknown>;
        function match(unknown: unknown, task: Closure<[e: Error<any, unknown>], void>): unknown is Error<any, unknown>;
        function match<T1 extends string>(unknown: unknown, code: T1): unknown is Error<T1, unknown>;
        function match<T1 extends string>(unknown: unknown, code: T1, task: Closure<[e: Error<T1, unknown>], void>): unknown is Error<T1, unknown>;
        function match<T1 extends string>(
            p0: unknown,
            p1?: T1 | Closure<[e: Error<T1, unknown>], void>,
            p2?: Closure<[e: Error<T1, unknown>], void>
        ): p0 is Error<T1, unknown> {
            let unknown: unknown = p0;
            if (!(
                unknown !== null
                && unknown !== undefined
                && typeof unknown === "object"
                && BrandedStruct.Handler.match(unknown, "Error")
            )) return false;
            
        }

        function panic<T1 extends string>(e: Error<T1>, handler?: Handler): never;
        function panic<T1 extends string>(code: T1, at?: Function, handler?: Handler): never;
        function panic<T1 extends string>(
            p0: Error<T1> | T1,
            p1?: Handler | Function,
            p2?: Handler
        ): never {
            if (typeof p0 === "object") {
                let e: Error<T1> = p0;
                let handler: Handler = flag((p1 as Handler | undefined)).unwrapOr(_this);
                throw [

                ].join("\n");
            }
            let code: T1 = p0;
            let at: Function = flag((p1 as Function | undefined)).unwrapOr(panic);
            let handler: Handler = flag(p2).unwrapOr(_this);
            throw code + "\n" + handler.localStackTrace(at);
        }

        function localStackTrace(location: Function): Option<string> {
            let e: ReturnType<typeof _Error0> = _Error0();
            _Error0.captureStackTrace(e, location);
            if (e.stack) return Some(e.stack);
            return None;
        }
    })();
}
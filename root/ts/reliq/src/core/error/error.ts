import type { BrandedStruct } from "@core";
import { ErrorHandler } from "@core";
import { Option } from "@core";
import { flag } from "@core";

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
export function Error<T1 extends string, T2 = unknown>(_configuration: {
    code: T1;
    message?: string;
    payload?: T2;
    stack?: string;
    handler?: ErrorHandler;
}): Error<T1, T2>;
export function Error<T1 extends string, T2 = unknown>(_code: T1, _message?: string, _payload?: T2): Error<T1, T2>;
export function Error<T1 extends string, T2 = unknown>(
    _p0: {
        code: T1;
        message?: string;
        payload?: T2;
        stack?: string;
        handler?: ErrorHandler;
    } | T1,
    _p1?: string,
    _p2?: T2
): Error<T1, T2> {
    /** @constructor */ {
        if (typeof _p0 === "object") {
            let configuration: {
                code: T1;
                message?: string;
                payload?: T2;
                stack?: string;
                handler?: ErrorHandler;
            } = _p0;
            let handler: ErrorHandler = flag(configuration.handler).unlockOr(ErrorHandler);
            return {
                type: "Error",
                code: configuration.code,
                message: flag(configuration.message),
                payload: flag(configuration.payload),
                stack: flag(configuration.stack).unlockOr(handler.parseStackTrace(Error))
            };
        }
        return {
            type: "Error",
            code: _p0,
            message: flag(_p1),
            payload: flag(_p2),
            stack: ErrorHandler.parseStackTrace(Error)
        };
    }
}
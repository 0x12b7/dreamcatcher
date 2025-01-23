import type { BrandedStruct } from "@root";
import { ErrorHandler, panic } from "@root";
import { Option } from "@root";
import { flag } from "@root";

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
export function Error<T1 extends string, T2 = unknown>({
    _code,
    _message,
    _payload,
    _stack,
    _handler=ErrorHandler 
}: _ErrorPayload<T1, T2>): Error<T1, T2> {
    /** @constructor */ {
        return {
            type: "Error",
            code: _code,
            message: flag(_message),
            payload: flag(_payload),
            stack: flag(_stack).unlockOr(_handler.parseStackTrace(Error))
        };
    }
}

type _ErrorPayload<T1, T2> = {
    _code: T1;
    _message?: string;
    _payload?: T2;
    _stack?: string;
    _handler?: ErrorHandler;
};
import type { Option } from "@root";
import { StackTrace } from "@root";
import { Some } from "@root";
import { None } from "@root";

export type Error<T1 extends string, T2 = unknown> = {
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
    stack: StackTrace;
};

/**
 * ***Brief***
 * A custom error with an optional message and payload for strongly-typed errors.
 * 
 * ***Note***
 * This is a general-purpose error structure to manage domain-specific error codes and provide better context.
 */
export function Error<T1 extends string, T2 = unknown>(_this: Error<T1, T2>): Error<T1, T2>;
export function Error<T1 extends string, T2 = unknown>(_code: T1, _message: string, _payload: T2): Error<T1, T2>;
export function Error<T1 extends string, T2 = unknown>(_code: T1, _message: string): Error<T1, T2>;
export function Error<T1 extends string, T2 = unknown>(_code: T1): Error<T1, T2>;
export function Error<T1 extends string, T2 = unknown>(
    _args0: Error<T1, T2> | T1,
    _args1?: string,
    _args2?: T2
): Error<T1, T2> {
    /** @constructor */ {
        if (typeof _args0 === "object") return _args0;
        let code: string = _args0;
        let messageO: Option<string> = None;
        let message0: string | undefined = _args1;
        if (message0) messageO = Some(message0);
        let payloadO: Option<T2> = None;
        let payload0: T2 | undefined = _args2;
        if (payload0) payloadO = Some(payload0);
        return Error({
            code: code,
            message: messageO,
            payload: payloadO,
            stack: StackTrace(Error)
        }) as Error<T1, T2>; /// This is okay because the type of `code` is `T1`.
    }
}
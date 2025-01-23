import { Error as Error0 } from "@root";
import { ErrorHandler } from "@root";
import { flag } from "@root";

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
export function panic<T1 extends string>(e: Error0<T1>, handler?: ErrorHandler): never;
export function panic<T1 extends string>(message: T1, location?: Function, handler?: ErrorHandler): never;
export function panic<T1 extends string>(
    p0: Error0<T1> | T1,
    p1?: ErrorHandler | Function,
    p2?: ErrorHandler
): never {
    if (typeof p0 === "object") {
        let e: Error0<T1> = p0;
        let handler: ErrorHandler = flag((p1 as ErrorHandler | undefined)).unlockOr(ErrorHandler);
        throw handler.convertToStandardError(e);
    }
    else {
        let message: T1 = p0;
        let location: Function = flag((p1 as Function | undefined)).unlockOr(panic);
        let handler: ErrorHandler = flag(p2).unlockOr(ErrorHandler);
        let eStandard: Error = Error();
        eStandard.name = "PANIC";
        eStandard.message = message;
        eStandard.cause = undefined;
        eStandard.stack = handler.parseStackTrace(location);
        throw eStandard;
    }
}
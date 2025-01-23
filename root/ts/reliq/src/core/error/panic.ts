import { Error as Error0, Option } from "@root";
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
export function panic<T1 extends string>(...payload: _PanicPayload<T1>): never {
    if (typeof payload[0] === "object") {
        let payload0: _PanicPayload0<T1> = (payload as _PanicPayload0<T1>);
        let e: Error0<T1> = payload0[0];
        let handler: ErrorHandler = flag(payload0[1]).unlockOr(ErrorHandler);
        throw handler.convertToStandardError(e);
    }
    else {
        let payload1: _PanicPayload1<T1> = (payload as _PanicPayload1<T1>);
        let message: T1 = payload1[0];
        let location: Function = flag(payload1[1]).unlockOr(panic);
        let handler: ErrorHandler = flag(payload1[2]).unlockOr(ErrorHandler);
        let eStandard: Error = Error();
        eStandard.name = "PANIC";
        eStandard.message = message;
        eStandard.cause = undefined;
        eStandard.stack = handler.parseStackTrace(location);
        throw eStandard;
    }
}

type _PanicPayload<T1 extends string> =    
    | _PanicPayload0<T1>
    | _PanicPayload1<T1>;

type _PanicPayload0<T1 extends string> = [e: Error0<T1>, handler?: ErrorHandler];

type _PanicPayload1<T1 extends string> = [message: T1, location?: Function, handler?: ErrorHandler];
import { Error as Error0 } from "@core";
import { ErrorHandler } from "@core";
import { flag } from "@core";

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
        let handler: ErrorHandler = flag((p1 as ErrorHandler | undefined)).unwrapOr(ErrorHandler);
        throw [
            "",
            "",
            "     " + `${ _red(e.code) } ${ e.message.unwrapOr("<<< UNAVAILABLE >>>") }`,
            "",
            "     STACK_TRACE" + 
            e.stack
        ].join("\n") as string;
    }
    else {
        let message: T1 = p0;
        let location: Function = flag((p1 as Function | undefined)).unwrapOr(panic);
        let handler: ErrorHandler = flag(p2).unwrapOr(ErrorHandler);
        let eStandard: Error = Error();
        eStandard.name = "PANIC";
        throw "PANIC " + message + "\n" + handler.parseStackTrace(location);
    }
}

function _red(string: string): string {
    return "\x1b[31m" + string + "\x1b[0m";
}
import { Error as Error0, StackTrace } from "@root";
import { localStackTrace } from "@root";

type _T1OrErrorT1<T1 extends string> = T1 | Error0<T1>;

/**
 * ***Brief***
 * `panic` throws an error with optional message and stack trace location.
 */
export function panic<T1 extends string>(e: Error0<T1>): never;
export function panic<T1 extends string>(message: T1): never;
export function panic<T1 extends string>(message: T1, location: Function): never;
export function panic<T1 extends string>(
    args0: _T1OrErrorT1<T1>, 
    args1?: Function
): never {
    let location: Function = args1 || panic;
    if (typeof args0 === "object") {
        let e: Error0<T1> = args0;
        let code: string = e.code;
        let message: string = "";
        e.message
            .map(message0 => {
                return message = message0;
            });
        let eStandard: Error = Error();
        eStandard.name = code;
        eStandard.message = message;
        eStandard.stack = e.stack.toString();
        eStandard.cause = undefined;
        throw eStandard;
    }
    let message: string = args0;
    let eStandard: Error = Error();
    eStandard.name = ""
    eStandard.message = message;
    eStandard.cause = undefined;
    eStandard.stack = localStackTrace(location)
        .toResult(undefined)
        .recover(() => {
            return "";
        })
        .unlock();
    throw eStandard;
}
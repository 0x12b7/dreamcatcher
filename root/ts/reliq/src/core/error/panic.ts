import { Error as Error0 } from "@root";
import { localStackTrace } from "@root";

type _T1OrErrorT1<T1 extends string> = T1 | Error0<T1>;

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
        let stack: string = "";
        e.message
            .map(message0 => {
                return message = message0;
            });
        e.stack
            .toResult(undefined)
            .map(stack0 => {
                return stack = stack0.toString();
            })
            .recover(() => {
                return stack = localStackTrace(location)
                    .toResult(undefined)
                    .recover(() => {
                        return "";
                    })
                    .unlock();
            });
        let eStandard: Error = Error();
        eStandard.name = code;
        eStandard.message = message;
        eStandard.stack = stack;
        eStandard.cause = undefined;
        throw eStandard;
    }
    let message: string = args0;
    let e: Error = Error();
    e.name = ""
    e.message = message;
    e.cause = undefined;
    e.stack = localStackTrace(location)
        .toResult(undefined)
        .recover(() => {
            return "";
        })
        .unlock();
    throw e;
}
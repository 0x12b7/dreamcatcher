import type { Option, StackTrace } from "@root";
import { Error as Error0 } from "@root";
import { Some } from "@root";
import { None } from "@root";

export function panic<T1 extends string>(e: Error0<T1>): never;
export function panic<T1 extends string>(message: T1): never;
export function panic<T1 extends string>(message: T1, location: object): never;
export function panic<T1 extends string>(
    args0: _T1OrErrorT1<T1>, 
    args1?: Function
): never {
    let location: Function = args1 || panic;
    if (typeof args0 === "object") {
        let e: Error0<T1> = args0;
        let code: string = e.code;
        let messageO: Option<string> = e.message;
        let stackO: Option<StackTrace> = e.stack;
        


        let message: string = "No message was provided.";
        let stack: string = ""
        e.message
            .map(message0 => {
                return message = message0;
            });
        e.stack
            .toResult(undefined)
            .map(stack => {
                return stack.toString();
            })
            .mapErr(() => {
                return _localeStackTrace(location)
                    .toResult(undefined)
                    .unlockOr("");
                
            });
            
        
        let localeStackTraceO: Option<string> = _localeStackTrace(panic);
        

        let eStandard: Error = Error(message);
        eStandard.stack = 
    }
    let e: Error = Error();
    
    
    Error.captureStackTrace(e, _1);
    throw _0 + "\n" + e.stack;
}

type _T1OrErrorT1<T1 extends string> = T1 | Error0<T1>;

function _message<T1 extends string>(e: Error0<T1>): string {
    return e.message
        .toResult(undefined)
        .recover(() => "")
        .unlockOr("");
}

function _localeStackTrace(location: Function): Option<string> {
    let e: Error = Error();
    Error.captureStackTrace(e, location);
    if (e.stack) return Some(e.stack);
    return None;
}
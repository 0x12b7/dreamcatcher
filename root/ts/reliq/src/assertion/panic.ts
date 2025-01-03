export function panic<T1 extends string>(msg: T1): never {
    let e: Error = Error(msg);
    Error.captureStackTrace(e, panic);
    throw e;
}
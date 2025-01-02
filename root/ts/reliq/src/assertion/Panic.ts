export function panic<T extends string>(msg: T): never {
    let e: Error = Error(msg);
    Error.captureStackTrace(e, panic);
    throw e;
}
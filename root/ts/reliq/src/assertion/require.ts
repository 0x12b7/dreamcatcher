export function require<T1 extends string>(condition: boolean, errcode: T1): asserts condition {
    if (condition) return;
    let e: Error = Error(errcode);
    Error.captureStackTrace(e, require);
    throw e;
}
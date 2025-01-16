export function panic<T1 extends string>(message: T1): never;
export function panic<T1 extends string>(message: T1, scope: Function): never;
export function panic<T1 extends string>(_0: T1, _1: Function = panic): never {
    let e: Error = Error();
    Error.captureStackTrace(e, _1);
    throw _0 + "\n" + e.stack;
}
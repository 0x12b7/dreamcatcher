export function panic<T1 extends string>(message: T1): never;
export function panic<T1 extends string>(message: T1, scope: Function): never;
export function panic<T1 extends string>(_0: T1, _1?: Function): never {
    let message: string = _0;
    let target: Function = _1 ?? panic;
    let e: Error = Error();
    Error.captureStackTrace(e, target);
    throw message + "\n" + e.stack;
}
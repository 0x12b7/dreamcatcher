
/**
 * **OUTCOME**
 * 
 * @example
 *  function main(): void {
 *      if () panic("Something went wrong.");
 *      /// ...
 *      return;
 *  }
 * 
 * @example
 *  function doSomething(): void {
 *      /// Pass an object to generate a stack trace from that
 *      /// instance.
 *      if () panic("Something went wrong.", doSomething);
 *      return;
 *  }
 */
export function panic<T1 extends string>(message: T1): never;
export function panic<T1 extends string>(message: T1, scope: Function): never;
export function panic<T1 extends string>(_0: T1, _1: Function = panic): never {
    let e: Error = Error();
    Error.captureStackTrace(e, _1);
    throw _0 + "\n" + e.stack;
}
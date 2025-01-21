import type { Err, Ok } from "@root";


/**
 * ***Brief***
 * A readonly variant that cannot be mutated, changed.
 * 
 * `SealedErr` carries a stack trace, cannot be expected,and has no unlock.
 * 
 *  And must be propagated or handled.
 * 
 * When propagated through the call stack, is guaranteed to maintain its original
 * content, useful for hashes, passwords, or anything that should not be mutated
 * or must be handled as they are.
 */
export type SealedErr<T1> = Pick<Err<T1>, 
    | "ok"
    | "err"
    | "stack"
    | "and"
    | "unlockOr">;


export type SealedResult<T1, T2> = Ok<T1> | SealedErr<T2>;

let r: SealedResult<200n, 404n>;

r!
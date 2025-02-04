import type { Closure } from "@core";
import type { AsyncClosure } from "@core";
import type { Result } from "@core";
import type { OkValOfAll } from "@core";
import type { ErrValOfAll } from "@core";
import type { Unsafe } from "@core";

/**
 * ***Brief***
 * Utility class for handling tasks with `Result`.
 */
export type ResultHandler = {

    /**
     * ***Brief***
     * Iterates through an array of `Result`, short-circuiting at the first `Err`.
     * 
     * ***Example***
     * ```ts
     * let r0: Result<200n, 404n>;
     * let r1: Result<201n, 405n>;
     * let r2: Result<202n, 406n>;
     * let r: Result<[200n, 201n, 202n], 404n | 405n | 406n> = Result.all([r0, r1, r2]);
     * ```
     */
    all<T1 extends Array<Result<unknown, unknown>>>(results: T1): Result<OkValOfAll<T1>, ErrValOfAll<T1>[number]>;
    
    /**
     * ***Brief***
     * Iterates through an array of `Result`, short-circuiting at the first `Ok`.
     * 
     * ***Example***
     * ```ts
     *  let r0: Result<200n, 404n>;
     *  let r1: Result<201n, 405n>;
     *  let r2: Result<202n, 406n>;
     *  let r: Result<200n | 201n | 202n, [404n, 405n, 406n]> = Result.any([r0, r1, r2]);
     * ```
     */
    any<T1 extends Array<Result<unknown, unknown>>>(results: T1): Result<OkValOfAll<T1>[number], ErrValOfAll<T1>>;
    
    /**
     * ***Brief***
     * Wraps an unsafe operation that might throw an error and returns a `Result`.
     * 
     * ***Example***
     * ```ts
     *  await Result.wrap(() => {
     *      /// Some unsafe task.
     *      /// ...
     *      return 200n;
     *  }).mapErr(unsafe => {
     *      unsafe
     *          .parse((unknown): unknown is string => {
     *              return typeof unknown is "string";
     *          })
     *          .map(string => {
     *              /// ...
     *          });
     *      return 200n;
     *  });
     * ```
     */
    wrap<T1, T2, T3 extends Array<T2>>(task: Closure<T3, T1>, ...payload: T3): Result<T1, Unsafe>;
    
    /**
     * ***Brief***
     * Wraps an asynchronous unsafe operation that may throw and returns a `Result`.
     * 
     * 
     * ***Example***
     * ```ts
     *  await Result.wrapAsync(async () => {
     *      /// Some unsafe async task.
     *      /// ...
     *      return 200n;
     *  }).mapErr(unsafe => {
     *      unsafe
     *          .parse((unknown): unknown is string => {
     *              return typeof unknown is "string";
     *          })
     *          .map(string => {
     *              /// ...
     *          });
     *      return 200n;
     *  });
     * ```
     */
    wrapAsync<T1, T2, T3 extends Array<T2>>(task: AsyncClosure<T3, T1>, ...payload: T3): Promise<Result<T1, Unsafe>>;
};
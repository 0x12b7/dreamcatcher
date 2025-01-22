import type { Closure } from "@root";
import type { AsyncClosure } from "@root";
import type { Result } from "@root";
import type { OkValOfAll } from "@root";
import type { ErrValOfAll } from "@root";
import type { Unsafe } from "@root";

/**
 * ***Brief***
 * Utility class for handling operations with `Result`.
 */
export type ResultHandler = {

    /**
     * ***Brief***
     * Iterates through an array of `Result` objects, short-circuiting at the first `Err`.
     * 
     * @example
     * let r0: Result<number, "ERR_SOMETHING_WENT_WRONG_0">;
     * let r1: Result<string, "ERR_SOMETHING_WENT_WRONG_1">;
     * let r2: Result<500000, "ERR_SOMETHING_WENT_WRONG_2">;
     * let r: Result<[number, string, 500000], "ERR_SOMETHING_WENT_WRONG_0" | "ERR_SOMETHING_WENT_WRONG_1" | "ERR_SOMETHING_WENT_WRONG_2"> = ResultHandler.all(r0, r1, r2);
     */
    all<T1 extends Array<Result<unknown, unknown>>>(...results: T1): Result<OkValOfAll<T1>, ErrValOfAll<T1>[number]>;
    
    /**
     * ***Brief***
     * Iterates through an array of `Result` objects, short-circuiting at the first `Ok`.
     */
    any<T1 extends Array<Result<unknown, unknown>>>(...results: T1): Result<OkValOfAll<T1>[number], ErrValOfAll<T1>>;
    
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
    wrapAsync<T1 extends Promise<unknown>, T2, T3 extends Array<T2>>(task: AsyncClosure<T3, T1>, ...payload: T3): Promise<Result<Awaited<T1>, Unsafe>>;
};
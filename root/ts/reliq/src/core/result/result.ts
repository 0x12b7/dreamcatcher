"raise 1";

import type { ErrValOfAll } from "@core";
import type { OkValOfAll } from "@core";
import type { ResultHandler } from "@core";
import type { Closure } from "@core";
import type { AsyncClosure } from "@core";
import { Ok } from "@core";
import { Err } from "@core";
import { Unsafe } from "@core";

/**
 * ***Brief***
 * A wrapper that encapsulates either a successful outcome `Ok<T1>` or a failure `Err<T2>`.
 * 
 * ***Example***
 * ```ts
 *  function foo(): Result<200n, 404n> {
 *      if () return Ok(200n);
 *      return Err(404n);
 *  }
 * 
 *  let result: Result<200n, 404n> = foo();
 *  if (result.ok()) {
 *      let value: 200n = result.unlock();
 *      /// ...
 *  }
 * ```
 */
export type Result<T1, T2> = Ok<T1> | Err<T2>;

export const Result: ResultHandler = (() => {
    /** @constructor */ {
        return { all, any, wrap, wrapAsync };
    }

    function all<T1 extends Array<Result<unknown, unknown>>>(results: T1): Result<OkValOfAll<T1>, ErrValOfAll<T1>[number]> {
        let out: Array<unknown> = [];
        let i: number = 0;
        while (i < results.length) {
            let result: Result<unknown, unknown> = results.at(i)!;
            if (result.ok()) out.push(result.unlock());
            else return result as Err<ErrValOfAll<T1>[number]>;
            i ++;
        }
        return Ok((out as OkValOfAll<T1>));
    }

    function any<T1 extends Array<Result<unknown, unknown>>>(results: T1): Result<OkValOfAll<T1>[number], ErrValOfAll<T1>> {
        let out: Array<unknown> = [];
        let i: number = 0;
        while (i < results.length) {
            let wrapper: Result<unknown, unknown> = results.at(i)!;
            if (wrapper.ok()) return wrapper as Ok<OkValOfAll<T1>[number]>;
            else out.push(wrapper.inspect());
            i ++;
        }
        return Err((out as ErrValOfAll<T1>));
    }
    
    function wrap<T1, T2, T3 extends Array<T2>>(task: Closure<T3, T1>, ...payload: T3): Result<T1, Unsafe> {
        try {
            return Ok(task(...payload));
        }
        catch (e) {
            return Err(Unsafe(e));
        }
    }

    async function wrapAsync<T1, T2, T3 extends Array<T2>>(task: AsyncClosure<T3, T1>, ...payload: T3): Promise<Result<T1, Unsafe>> {
        try {
            return Ok((await task(...payload)));
        }
        catch (e) {
            return Err(Unsafe(e));
        }
    }
})();
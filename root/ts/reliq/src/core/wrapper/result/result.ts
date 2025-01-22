import type { ErrValOfAll } from "@root";
import type { OkValOfAll } from "@root";
import type { ResultHandler } from "@root";
import type { Closure } from "@root";
import type { AsyncClosure } from "@root";
import { Ok } from "@root";
import { Err } from "@root";
import { Unsafe } from "@root";

/**
 * **NOTE**
 * A wrapper that encapsulates either a success `Ok<T1>` or failure `Err<T2>`.
 * 
 * **NOTE**
 * A `Result<T1, T2>` can be in one of two states.
 * - `Ok<T1>` - A successful result with a value of type `T1`.
 * - `Err<T2>` - A failure with an error or value of type `T2`.
 * 
 * **EXAMPLE**
 * ```typescript
 *  function foo(): Result<200, 404> {
 *      if () return Ok(200);
 *      return Err(404);
 *  }
 * 
 *  let result: Result<200, 404> = foo();
 *  if (result.ok()) {
 *      let value: 200 = result.unwrapSafely();
 *      /// ...
 *  }
 * ```
 */
export type Result<T1, T2> = Ok<T1> | Err<T2>;

export const Result: ResultHandler = (() => {
    /** @constructor */ {
        return { all, any, wrap, wrapAsync };
    }

    function all<T1 extends Array<Result<unknown, unknown>>>(...results: T1): Result<OkValOfAll<T1>, ErrValOfAll<T1>[number]> {
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

    function any<T1 extends Array<Result<unknown, unknown>>>(...results: T1): Result<OkValOfAll<T1>[number], ErrValOfAll<T1>> {
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

    async function wrapAsync<T1 extends Promise<unknown>, T2, T3 extends Array<T2>>(task: AsyncClosure<T3, T1>, ...payload: T3): Promise<Result<Awaited<T1>, Unsafe>> {
        try {
            return Ok((await task(...payload)));
        }
        catch (e) {
            return Err(Unsafe(e));
        }
    }
})();
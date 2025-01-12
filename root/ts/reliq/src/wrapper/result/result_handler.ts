import type { Closure } from "@root";
import type { AsyncClosure } from "@root";
import type { Result } from "@root";
import type { OkValOfAll } from "@root";
import type { ErrValOfAll } from "@root";
import { Unsafe } from "@root";
import { Ok } from "@root";
import { Err } from "@root";

export type ResultHandler = {
    all<T1 extends Array<Result<unknown, unknown>>>(...wrappers: T1): Result<OkValOfAll<T1>, ErrValOfAll<T1>[number]>;
    any<T1 extends Array<Result<unknown, unknown>>>(...wrappers: T1): Result<OkValOfAll<T1>[number], ErrValOfAll<T1>>;
    wrap<T1, T2, T3 extends Array<T2>>(operation: Closure<T3, T1>, ...payload: T3): Result<T1, Unsafe>;
    wrapAsync<T1 extends Promise<unknown>, T2, T3 extends Array<T2>>(operation: AsyncClosure<T3, T1>, ...payload: T3): Promise<Result<Awaited<T1>, Unsafe>>;
};

export const ResultHandler: ResultHandler = (() => {
    /** @constructor */ {
        return { all, any, wrap, wrapAsync };
    }

    function all<T1 extends Array<Result<unknown, unknown>>>(...wrappers: T1): Result<OkValOfAll<T1>, ErrValOfAll<T1>[number]> {
        let result: Array<unknown> = [];
        let i: number = 0;
        while (i < wrappers.length) {
            let wrapper: Result<unknown, unknown> = wrappers.at(i)!;
            if (wrapper.ok()) result.push(wrapper.val());
            else return wrapper as Err<ErrValOfAll<T1>[number]>;
            i ++;
        }
        return Ok((result as OkValOfAll<T1>));
    }

    function any<T1 extends Array<Result<unknown, unknown>>>(...wrappers: T1): Result<OkValOfAll<T1>[number], ErrValOfAll<T1>> {
        let result: Array<unknown> = [];
        let i: number = 0;
        while (i < wrappers.length) {
            let wrapper: Result<unknown, unknown> = wrappers.at(i)!;
            if (wrapper.ok()) return wrapper as Ok<OkValOfAll<T1>[number]>;
            else result.push(wrapper.val());
            i ++;
        }
        return Err((result as ErrValOfAll<T1>));
    }
    
    function wrap<T1, T2, T3 extends Array<T2>>(op: Closure<T3, T1>, ... args: T3): Result<T1, Unsafe> {
        try {
            return Ok(op(... args));
        }
        catch (e) {
            return Err(Unsafe(e));
        }
    }

    async function wrapAsync<T1 extends Promise<unknown>, T2, T3 extends Array<T2>>(op: AsyncClosure<T3, T1>, ... args: T3): Promise<Result<Awaited<T1>, Unsafe>> {
        try {
            return Ok((await op(... args)));
        }
        catch (e) {
            return Err(Unsafe(e));
        }
    }
})();


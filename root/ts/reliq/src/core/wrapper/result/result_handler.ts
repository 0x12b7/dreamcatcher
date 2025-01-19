import {
    type Closure,
    type AsyncClosure,
    type Result,
    type OkValOfAll,
    type ErrValOfAll,
    type ResultArray,
    type AsyncResult,
    Unsafe,
    Ok,
    Err
} from "@root";

/**
 * **NOTE**
 * A util `class` to handle `Result`. 
 */
type ResultHandler = {

    /**
     * **NOTE**
     * 
     * 
     * **OUTCOME**
     * Iterate through a `ResultArray` short circuit at the first `Err` or return
     * a `Tuple` of all successful values. Will return as a `Result`.
     * 
     * @example
     * let r0: Result<number, "ERR_SOMETHING_WENT_WRONG_0">;
     * let r1: Result<string, "ERR_SOMETHING_WENT_WRONG_1">;
     * let r2: Result<500000, "ERR_SOMETHING_WENT_WRONG_2">;
     * let r: Result<[number, string, 500000], "ERR_SOMETHING_WENT_WRONG_0" | "ERR_SOMETHING_WENT_WRONG_1" | "ERR_SOMETHING_WENT_WRONG_2"> = ResultHandler.all(r0, r1, r2);
     */
    all<T1 extends ResultArray<unknown, unknown>>(...results: T1): Result<OkValOfAll<T1>, ErrValOfAll<T1>[number]>;
    
    /**
     * **OUTCOME**
     * Iterate through a `ResultArray` short circuit at the first `Ok` or return
     * a `Tuple` of all errors. Will return as a `Result`.
     * 
     * @example
     * 
     */
    any<T1 extends ResultArray<unknown, unknown>>(...results: T1): Result<OkValOfAll<T1>[number], ErrValOfAll<T1>>;
    
    /**
     * **OUTCOME**
     * Wrap an unsafe operation which may throw and wrap the `unknown` error
     * in an `Unsafe` wrapper.
     * 
     * @example
     *  let exampleR: Result<number, Unsafe> = ResultHandler.wrap(() => {
     *      if () throw "ERR_SOMETHING_WENT_WRONG";
     *      return 500;
     *  });
     *  exampleR.mapErr(unsafe => {
     *      let stringO: Option<string> = unsafe.parse((unknown): unknown is string => {
     *          if (
     *              unknown !== null
     *              && unknown !== undefined
     *              && typeof unknown === "string"
     *          ) return true;
     *          else return false;
     *      });
     *      /// ...
     *  });
     */
    wrap<T1, T2, T3 extends Array<T2>>(operation: Closure<T3, T1>, ...payload: T3): Result<T1, Unsafe>;
    
    /**
     * **OUTCOME**
     * Wrap an unsafe async operation which may throw and wrap the `unknown` error
     * in an `Unsafe` wrapper.
     * 
     * @example
     *  let exampleR: Result<number, Unsafe> = await ResultHandler.wrapAsync(async () => {
     *      /// Some async operation.
     *      if () throw "ERR_SOMETHING_WENT_WRONG";
     *      return 500;
     *  });
     *  exampleR.mapErr(unsafe => {
     *      let stringO: Option<string> = unsafe.parse((unknown): unknown is string => {
     *          if (
     *              unknown !== null
     *              && unknown !== undefined
     *              && typeof unknown === "string"
     *          ) return true;
     *          else return false;
     *      });
     *      /// ...
     *  });
     */
    wrapAsync<T1 extends Promise<unknown>, T2, T3 extends Array<T2>>(operation: AsyncClosure<T3, T1>, ...payload: T3): AsyncResult<Awaited<T1>, Unsafe>;
};

const ResultHandler: ResultHandler = (() => {
    /** @constructor */ {
        return { all, any, wrap, wrapAsync };
    }

    function all<T1 extends ResultArray<unknown, unknown>>(...results: T1): Result<OkValOfAll<T1>, ErrValOfAll<T1>[number]> {
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
    
    function wrap<T1, T2, T3 extends Array<T2>>(operation: Closure<T3, T1>, ...payload: T3): Result<T1, Unsafe> {
        try {
            return Ok(operation(...payload));
        }
        catch (e) {
            return Err(Unsafe(e));
        }
    }

    async function wrapAsync<T1 extends Promise<unknown>, T2, T3 extends Array<T2>>(operation: AsyncClosure<T3, T1>, ...payload: T3): Promise<Result<Awaited<T1>, Unsafe>> {
        try {
            return Ok((await operation(...payload)));
        }
        catch (e) {
            return Err(Unsafe(e));
        }
    }
})();

export { ResultHandler };
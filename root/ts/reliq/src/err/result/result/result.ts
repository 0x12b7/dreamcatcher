import type { Closure } from "@root";
import type { AsyncClosure } from "@root";
import type { OkValOfAll } from "@root";
import type { ErrValOfAll } from "@root";
import type { ResultHandler } from "@root";
import { Ok } from "@root";
import { Err } from "@root";
import { Unsafe } from "@root";

export type Result<T1, T2> = Ok<T1> | Err<T2>;

export const Result: ResultHandler = (() => {
    /***/ {
        return {
            match,
            ok,
            err,
            all,
            any,
            wrap,
            wrapAsync
        };
    }

    function match(unknown: unknown): unknown is Result<unknown, unknown> {
        return ok(unknown) || err(unknown);
    }

    function ok(unknown: unknown): unknown is Ok<unknown> {
        let match: boolean =
            unknown !== undefined
            && unknown !== null
            && typeof unknown === "object"
            && "ok" in unknown
            && "err" in unknown
            && "val" in unknown
            && "expect" in unknown
            && "expectErr" in unknown
            && "unwrap" in unknown
            && "unwrapOr" in unknown
            && "unwrapSafely" in unknown
            && "andThen" in unknown
            && "map" in unknown
            && "mapErr" in unknown
            && "toOption" in unknown
            && "toString" in unknown
            && typeof unknown.ok === "function"
            && typeof unknown.err === "function"
            && typeof unknown.val === "function"
            && typeof unknown.expect === "function"
            && typeof unknown.expectErr === "function"
            && typeof unknown.unwrap === "function"
            && typeof unknown.unwrapOr === "function"
            && typeof unknown.unwrapSafely === "function"
            && typeof unknown.andThen === "function"
            && typeof unknown.map === "function"
            && typeof unknown.mapErr === "function"
            && typeof unknown.toOption === "function"
            && typeof unknown.toString === "function"
            && typeof unknown.ok() === "boolean"
            && typeof unknown.err() === "boolean"
            && typeof unknown.toString() === "string"
            && unknown.ok() === true
            && unknown.err() === false;
        return match;
    }

    function err(unknown: unknown): unknown is Err<unknown> {
        let match: boolean =
            unknown !== undefined
            && unknown !== null
            && typeof unknown === "object"
            && "ok" in unknown
            && "err" in unknown
            && "val" in unknown
            && "stack" in unknown
            && "expect" in unknown
            && "expectErr" in unknown
            && "unwrap" in unknown
            && "unwrapOr" in unknown
            && "andThen" in unknown
            && "map" in unknown
            && "mapErr" in unknown
            && "toOption" in unknown
            && "toString" in unknown
            && typeof unknown.ok === "function"
            && typeof unknown.err === "function"
            && typeof unknown.val === "function"
            && typeof unknown.stack === "function"
            && typeof unknown.expect === "function"
            && typeof unknown.expectErr === "function"
            && typeof unknown.unwrap === "function"
            && typeof unknown.unwrapOr === "function"
            && typeof unknown.andThen === "function"
            && typeof unknown.map === "function"
            && typeof unknown.mapErr === "function"
            && typeof unknown.toOption === "function"
            && typeof unknown.toString === "function"
            && typeof unknown.ok() === "boolean"
            && typeof unknown.err() === "boolean"
            && typeof unknown.toString() === "string"
            && unknown.ok() === false
            && unknown.err() === true;
        return match;
    }

    function all<T1 extends Array<Result<unknown, unknown>>>(... results: T1): Result<OkValOfAll<T1>, ErrValOfAll<T1>[number]> {
        let out: Array<unknown> = [];
        let i: bigint = 0n;
        while (i < results.length) {
            let result: Result<unknown, unknown> = results[Number(i)];
            if (result.ok()) out.push(result.val());
            else return result as Err<ErrValOfAll<T1>[number]>;
            i++;
        }
        return Ok(out as OkValOfAll<T1>);
    }

    function any<T1 extends Array<Result<unknown, unknown>>>(... results: T1): Result<OkValOfAll<T1>[number], ErrValOfAll<T1>> {
        let out: Array<unknown> = [];
        let i: bigint = 0n;
        while (i < results.length) {
            let result: Result<unknown, unknown> = results[Number(i)];
            if (result.ok()) return result as Ok<OkValOfAll<T1>[number]>;
            else out.push(result.val());
            i++;
        }
        return Err(out as ErrValOfAll<T1>);
    }

    function wrap<T1, T2, T3 extends Array<T2>>(op: Closure<T3, T1>, ... args: T3): Result<T1, Unsafe<unknown>> {
        try {
            return Ok(op(... args));
        }
        catch (e) {
            return Err(Unsafe(e));
        }
    }

    async function wrapAsync<T1 extends Promise<unknown>, T2, T3 extends Array<T2>>(op: AsyncClosure<T3, T1>, ... args: T3): Promise<Result<Awaited<T1>, Unsafe<unknown>>> {
        try {
            return Ok((await op(... args)));
        }
        catch (e) {
            return Err(Unsafe(e));
        }
    }
})();
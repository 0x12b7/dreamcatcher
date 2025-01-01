import type { Function } from "@root";
import type { AsyncFunction } from "@root";
import type { OkValOfAll } from "@root";
import type { ErrValOfAll } from "@root";
import type { ResultHandler } from "@root";
import { Ok } from "@root";
import { Err } from "@root";

export type Result<T, E> = Ok<T> | Err<E>;

export const Result: ResultHandler = (() => {
    /***/ {
        return {
            isResult,
            isOk,
            isErr,
            wrap,
            wrapAsync,
            unwrapAll,
            unwrapAny
        };
    }

    function isResult(unknown: unknown): unknown is Result<unknown, unknown> {
        return isOk(unknown) || isErr(unknown);
    }

    function isOk(unknown: unknown): unknown is Ok<unknown> {
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

    function isErr(unknown: unknown): unknown is Err<unknown> {
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

    function wrap<T, E = unknown>(op: Function<void, T>): Result<T, E> {
        try {
            return Ok(op());
        }
        catch (e) {
            return Err<E>(e as E);
        }
    }

    async function wrapAsync<T, E = unknown>(op: AsyncFunction<void, T>): Promise<Result<T, E>> {
        try {
            return Ok(await op());
        }
        catch (e) {
            return Err(e as E);
        }
    }

    function unwrapAll<T extends Array<Result<unknown, unknown>>>(...wrappers: T): Result<OkValOfAll<T>, ErrValOfAll<T>[number]> {
        let r: Array<unknown> = [];
        let i: bigint = 0n;
        while (i < wrappers.length) {
            let wrapper: Result<unknown, unknown> = wrappers[Number(i)];
            if (wrapper.ok()) r.push(wrapper.val());
            else return wrapper as Err<ErrValOfAll<T>[number]>;
            i++;
        }
        return Ok(r as OkValOfAll<T>);
    }

    function unwrapAny<T extends Array<Result<unknown, unknown>>>(...wrappers: T): Result<OkValOfAll<T>[number], ErrValOfAll<T>> {
        let r: Array<unknown> = [];
        let i: bigint = 0n;
        while (i < wrappers.length) {
            let wrapper: Result<unknown, unknown> = wrappers[Number(i)];
            if (wrapper.ok()) return wrapper as Ok<OkValOfAll<T>[number]>;
            else r.push(wrapper.val());
            i++;
        }
        return Err(r as ErrValOfAll<T>);
    }
})();
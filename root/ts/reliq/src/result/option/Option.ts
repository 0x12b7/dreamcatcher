import type { OptionHandler } from "@root";
import type { Function } from "@root";
import type { AsyncFunction } from "@root";
import type { SomeValOfAll } from "@root";
import { Some } from "@root";
import { None } from "@root";

export type Option<T> = Some<T> | None;

export const Option: OptionHandler = (() => {
    /***/ {
        return {
            isOption,
            isSome,
            isNone,
            wrap,
            wrapAsync,
            unwrapAll,
            unwrapAny
        };
    }

    function isOption(unknown: unknown): unknown is Option<unknown> {
        return isSome(unknown) || isNone(unknown);
    }

    function isSome(unknown: unknown): unknown is Some<unknown> {
        let match: boolean =
            unknown !== undefined
            && unknown !== null
            && typeof unknown === "object"
            && "some" in unknown
            && "none" in unknown
            && "val" in unknown
            && "expect" in unknown
            && "unwrap" in unknown
            && "unwrapOr" in unknown
            && "unwrapSafely" in unknown
            && "andThen" in unknown
            && "map" in unknown
            && "toResult" in unknown
            && "toString" in unknown
            && typeof unknown.some === "function"
            && typeof unknown.none === "function"
            && typeof unknown.val === "function"
            && typeof unknown.expect === "function"
            && typeof unknown.unwrap === "function"
            && typeof unknown.unwrapOr === "function"
            && typeof unknown.unwrapSafely === "function"
            && typeof unknown.andThen === "function"
            && typeof unknown.map === "function"
            && typeof unknown.toResult === "function"
            && typeof unknown.toString === "function"
            && typeof unknown.some() === "boolean"
            && typeof unknown.none() === "boolean"
            && typeof unknown.toString() === "string"
            && unknown.some() === true
            && unknown.none() === false;
        return match;
    }

    function isNone(unknown: unknown): unknown is None {
        let match: boolean =
            unknown !== undefined
            && unknown !== null
            && typeof unknown === "object"
            && "some" in unknown
            && "none" in unknown
            && "val" in unknown
            && "expect" in unknown
            && "unwrap" in unknown
            && "unwrapOr" in unknown
            && "unwrapSafely" in unknown
            && "andThen" in unknown
            && "map" in unknown
            && "toResult" in unknown
            && "toString" in unknown
            && typeof unknown.some === "function"
            && typeof unknown.none === "function"
            && typeof unknown.val === "function"
            && typeof unknown.expect === "function"
            && typeof unknown.unwrap === "function"
            && typeof unknown.unwrapOr === "function"
            && typeof unknown.unwrapSafely === "function"
            && typeof unknown.andThen === "function"
            && typeof unknown.map === "function"
            && typeof unknown.toResult === "function"
            && typeof unknown.toString === "function"
            && typeof unknown.some() === "boolean"
            && typeof unknown.none() === "boolean"
            && typeof unknown.toString() === "string"
            && unknown.some() === false
            && unknown.none() === true;
        return match;
    }

    function wrap<T>(op: Function<void, T>): Option<T> {
        try {
            return Some(op());
        }
        catch {
            return None;
        }
    }

    async function wrapAsync<T>(op: AsyncFunction<void, T>): Promise<Option<T>> {
        try {
            return Some(await op());
        }
        catch {
            return None;
        }
    }

    function unwrapAll<T extends Array<Option<unknown>>>(...wrappers: T): Option<SomeValOfAll<T>> {
        let r: Array<unknown> = [];
        let i: bigint = 0n;
        while (i < wrappers.length) {
            let wrapper: Option<unknown> = wrappers[Number(i)];
            if (wrapper.some()) r.push(wrapper.val());
            else return wrapper as None;
            i++;
        }
        return Some(r as SomeValOfAll<T>);
    }

    function unwrapAny<T extends Array<Option<unknown>>>(...wrappers: T): Option<SomeValOfAll<T>[number]> {
        let i: bigint = 0n;
        while (i < wrappers.length) {
            let wrapper: Option<unknown> = wrappers[Number(i)];
            if (wrapper.some()) return wrapper as Some<SomeValOfAll<T>[number]>;
            else return wrapper as None;
        }
        return None;
    }
})();
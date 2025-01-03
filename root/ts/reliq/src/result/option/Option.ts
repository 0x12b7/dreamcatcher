import type { OptionHandler } from "@root";
import type { Closure } from "@root";
import type { AsyncClosure } from "@root";
import type { SomeValOfAll } from "@root";
import { Some } from "@root";
import { None } from "@root";

export type Option<T> = Some<T> | None;

export const Option: OptionHandler = (() => {
    /***/ {
        return {
            match,
            some,
            none,
            all,
            any,
            wrap,
            wrapAsync
        };
    }

    function match(unknown: unknown): unknown is Option<unknown> {
        return some(unknown) || none(unknown);
    }

    function some(unknown: unknown): unknown is Some<unknown> {
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

    function none(unknown: unknown): unknown is None {
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

    function all<T1 extends Array<Option<unknown>>>(... options: T1): Option<SomeValOfAll<T1>> {
        let out: Array<unknown> = [];
        let i: bigint = 0n;
        while (i < options.length) {
            let option: Option<unknown> = options[Number(i)];
            if (option.some()) out.push(option.val());
            else return option as None;
            i++;
        }
        return Some((out as SomeValOfAll<T1>));
    }

    function any<T1 extends Array<Option<unknown>>>(... options: T1): Option<SomeValOfAll<T1>[number]> {
        let i: bigint = 0n;
        while (i < options.length) {
            let option: Option<unknown> = options[Number(i)];
            if (option.some()) return (option as Some<SomeValOfAll<T1>[number]>);
            else return (option as None);
        }
        return None;
    }

    function wrap<T1, T2, T3 extends Array<T2>>(op: Closure<T3, T1>, ... args: T3): Option<T1> {
        try {
            return Some(op(... args));
        }
        catch {
            return None;
        }
    }

    async function wrapAsync<T1, T2, T3 extends Array<T2>>(op: AsyncClosure<T3, T1>, ... args: T3): Promise<Option<T1>> {
        try {
            return Some((await op(... args)));
        }
        catch {
            return None;
        }
    }
})();
import type { Closure } from "@root";
import { Option } from "@root";
import { Some } from "@root";
import { None } from "@root";

export type AssertionHandler = {
    some<T1>(v: null): false;
    some<T1>(v: undefined): false;
    some<T1>(v: T1 | null | undefined): v is Exclude<T1, null | undefined>;
    some<T1>(v: T1 | null | undefined): v is Exclude<T1, null | undefined>;
    none<T1>(v: null): true;
    none<T1>(v: undefined): true;
    none<T1>(v: T1 | null | undefined): v is null | undefined;
    none<T1>(v: T1 | null | undefined): v is null | undefined;
    mapErr<T1 extends string, T2>(e: unknown, errcode: T1, handler: Closure<[], T2>): Option<T2>;
};

export const Assert: AssertionHandler = (() => {
    /** @constructor */ {
        return { some, none, mapErr };
    }

    function some<T1>(v: undefined): false;
    function some<T1>(v: null): false;
    function some<T1>(v: T1 | null | undefined): v is Exclude<T1, null | undefined>;
    function some<T1>(v: T1 | null | undefined): v is Exclude<T1, null | undefined> {
        let match: boolean =
            v !== null
            && v !== undefined;
        return match;
    }

    function none<T1>(v: null): true;
    function none<T1>(v: undefined): true;
    function none<T1>(v: T1 | null | undefined): v is null | undefined;
    function none<T1>(v: T1 | null | undefined): v is null | undefined {
        let match: boolean =
            v === null
            && v === undefined;
        return match;
    }

    function mapErr<T1 extends string, T2>(e: unknown, errcode: T1, handler: Closure<[], T2>): Option<T2> {
        let match: boolean =
            e !== null
            && e !== undefined
            && typeof e === "object"
            && "message" in e
            && typeof e.message === "string"
            && e.message === errcode;
        if (match) {
            return Some(handler());
        }
        return None;
    }
})();

export function assert<T1 extends string>(condition: boolean, errcode: T1): asserts condition {
    if (condition) return;
    let e: Error = Error(errcode);
    Error.captureStackTrace(e, assert);
    throw e;
}
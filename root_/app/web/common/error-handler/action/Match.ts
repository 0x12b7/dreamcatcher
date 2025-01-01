import type {Function} from "->common";
import type {MaybeAsync} from "->common";
import type {Maybe} from "->common";

export function match<T, X>(e: unknown, errcode: T | Array<T>, action: Function<unknown, X>): MaybeAsync<Maybe<X>> {
    if (!("cause" in (e as any)
        && "message" in (e as any)
        && "name" in (e as any)
        && "stack" in (e as any)
        && typeof (e as any).message === "string"
        && typeof (e as any).name === "string"
        && Array.isArray(errcode) ? errcode.includes((e as any).message) : errcode === (e as any).message
    )) return;
    return new Promise(async resolve => resolve((await action((e as any).cause))));
}
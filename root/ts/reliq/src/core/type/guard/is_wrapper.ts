import type { Wrapper } from "@core";
import type { TypeGuard } from "@core";

export function isWrapper<T1>(unknown: unknown): unknown is Wrapper<T1> {
    let op: TypeGuard<Wrapper<T1>> = (unknown: unknown): unknown is Wrapper<T1> => {
        return unknown !== null
            && unknown !== undefined
            && typeof unknown === "object"
            && "unwrap" in unknown
            && typeof unknown.unwrap === "function";
    };
    return op(unknown);
}
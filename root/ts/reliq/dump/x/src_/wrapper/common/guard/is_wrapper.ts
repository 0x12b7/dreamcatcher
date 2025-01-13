import type { Wrapper } from "@root";
import type { TypeGuard } from "@root";

export function isWrapper<T1>(unknown: unknown): unknown is Wrapper<T1> {
    let guard: TypeGuard<Wrapper<T1>> = (unknown: unknown): unknown is Wrapper<T1> => {
        return unknown !== null
            && unknown !== undefined
            && typeof unknown === "object"
            && "unwrap" in unknown
            && typeof unknown.unwrap === "function";
    };
    return guard(unknown);
}
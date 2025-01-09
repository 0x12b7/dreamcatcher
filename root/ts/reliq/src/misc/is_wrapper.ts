import type { Wrapper } from "@root";

export function isWrapper(v: unknown): v is Wrapper<unknown> {
    if (
        v !== null 
        && v !== undefined 
        && typeof v === "object" 
        && "unwrap" in v 
        && typeof v.unwrap === "function"
    ) return true;
    else return false;
}
import { type Wrapper } from "@root";

export function isWrapper(x: unknown): x is Wrapper<unknown> {
    if (
        x !== null 
        && x !== undefined 
        && typeof x === "object" 
        && "unwrap" in x 
        && typeof x.unwrap === "function"
    ) return true;
    else return false;
}
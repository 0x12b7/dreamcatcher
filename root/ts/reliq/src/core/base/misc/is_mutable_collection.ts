import type { MutableCollection } from "@root";

export function isMutableCollection(v: unknown): v is MutableCollection<unknown> {
    if (
        v !== null
        && v !== undefined
        && typeof v === "object"
        && "concat" in v
        && "pop" in v
        && "push" in v
        && "reverse" in v
        && "shift" in v
        && "unshift" in v
        && "splice" in v
        && typeof v.concat === "function"
        && typeof v.pop === "function"
        && typeof v.push === "function"
        && typeof v.reverse === "function"
        && typeof v.shift === "function"
        && typeof v.unshift === "function"
        && typeof v.splice === "function"
    ) return true;
    return false;
}
import type { Index } from "@root";

export function isIndex(v: unknown): v is Index<unknown> {
    if (
        v !== null
        && v !== undefined
        && typeof v === "object"
        && "has" in v
        && "positionOf" in v
        && "find" in v
        && typeof v.has === "function"
        && typeof v.positionOf === "function"
        && typeof v.find === "function"
    ) return true;
    return false;
}
import type { Sequence } from "@root";

export function isSequence(v: unknown): v is Sequence<unknown> {
    if (
        v !== null
        && v !== undefined
        && typeof v === "object"
        && "join" in v
        && "slice" in v
        && "sort" in v
        && "map" in v
        && typeof v.join === "function"
        && typeof v.slice === "function"
        && typeof v.sort === "function"
        && typeof v.map === "function"
    ) return true;
    return false;
}
import type { Polymorph } from "@root";

export function isPolymorph(v: unknown): v is Polymorph<unknown> {
    if (
        v !== null
        && v !== undefined
        && typeof v === "object"
        && "toArray" in v
        && "toString" in v
        && "toLocaleString" in v
        && typeof v.toArray === "function"
        && typeof v.toString === "function"
        && typeof v.toLocaleString === "function"
    ) return true;
    else return false;
}
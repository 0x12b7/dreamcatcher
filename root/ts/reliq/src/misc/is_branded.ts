import type { Branded } from "@root";

export function isBranded<T1 extends string>(v: unknown, type: T1): v is Branded<T1> {
    if (
        v !== null
        && v !== undefined
        && typeof v === "object"
        && "type" in v
        && typeof v.type === "function"
        && typeof v.type() === "string"
        && v.type() === type
    ) return true;
    else return false;
}
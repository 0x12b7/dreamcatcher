import type { Span } from "@root";

export function isSpan(v: unknown): v is Span<unknown> {
    if (
        v !== null
        && v !== undefined
        && typeof v === "object"
        && "length" in v
        && "at" in v
        && typeof v.length === "function"
        && typeof v.at === "function"
        && typeof v.length() === "bigint"
        && typeof v.at() === "object"
    ) return true;
    else return false;
}
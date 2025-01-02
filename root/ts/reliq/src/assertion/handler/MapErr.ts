import type { Function } from "@root";
import type { Maybe } from "@root";

export function mapErr<T extends string, X>(e: unknown, errcode: T, handler: Function<void, X>): Maybe<X> {
    let match: boolean =
        e !== null
        && e !== undefined
        && typeof e === "object"
        && "message" in e
        && typeof e.message === "string"
        && e.message === errcode;
    if (match) {
        return handler();
    }
    return;
}
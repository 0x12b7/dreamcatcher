import type { Maybe } from "@root";

export function some<T>(v: undefined): false;
export function some<T>(v: null): false;
export function some<T>(v: Maybe<T>): v is Exclude<Maybe<T>, null | undefined>;
export function some<T>(v: Maybe<T>): v is Exclude<Maybe<T>, null | undefined> {
    let match: boolean =
        v !== null
        && v !== undefined;
    return match;
}
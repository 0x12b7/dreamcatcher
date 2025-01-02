import type { Maybe } from "@root";

export function none<T>(v: undefined): true;
export function none<T>(v: null): true;
export function none<T>(v: Maybe<T>): v is null | undefined;
export function none<T>(v: Maybe<T>): v is null | undefined {
    let match: boolean =
        v === null
        && v === undefined;
    return match;
}
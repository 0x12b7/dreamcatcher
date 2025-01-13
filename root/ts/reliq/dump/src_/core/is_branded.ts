import { type Branded } from "@root";

export function isBranded<T1 extends string>(x: unknown, type: T1): x is Branded<T1> {
    let match: boolean =
        x !== null
        && x !== undefined
        && typeof x === "object"
        && "type" in x
        && typeof x.type === "function"
        && typeof x.type() === "string"
        && x.type() === type;
    return match;
}
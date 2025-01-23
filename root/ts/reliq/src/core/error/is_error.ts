import { Error } from "@root";
import { isBranded } from "@root";

export function isError<T1 extends string>(unknown: unknown, code: T1): unknown is Error<T1, unknown> {
    const match: boolean =
        unknown !== null
        && unknown !== undefined
        && typeof unknown === "object"
        && "code" in unknown
        && typeof unknown.code === "string"
        && unknown.code === code
        && isBranded(unknown, "Error");
    return match;
}
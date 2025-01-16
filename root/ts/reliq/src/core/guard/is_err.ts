import {
    type TypeGuard,
    type Err,
    isBranded
} from "@root";

export function isErr(unknown: unknown): unknown is Err<unknown> {
    let guard: TypeGuard<Err<unknown>> = (unknown: unknown): unknown is Err<unknown> => {
        return isBranded(unknown, "Err");
    };
    return guard(unknown);
}
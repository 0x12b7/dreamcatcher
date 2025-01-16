import {
    type TypeGuard,
    type Ok,
    isBranded
} from "@root";

export function isOk(unknown: unknown): unknown is Ok<unknown> {
    let guard: TypeGuard<Ok<unknown>> = (unknown: unknown): unknown is Ok<unknown> => {
        return isBranded(unknown, "Ok");
    };
    return guard(unknown);
}
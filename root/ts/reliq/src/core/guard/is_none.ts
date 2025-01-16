import {
    type TypeGuard,
    type None,
    isBranded
} from "@root";

export function isNone(unknown: unknown): unknown is None {
    let guard: TypeGuard<None> = (unknown: unknown): unknown is None => {
        return isBranded(unknown, "None");
    };
    return guard(unknown);
}
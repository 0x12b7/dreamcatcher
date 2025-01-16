import {
    type Some,
    isBranded
} from "@root";

export function isSome(unknown: unknown): unknown is Some<unknown> {
    return isBranded(unknown, "Some");
}
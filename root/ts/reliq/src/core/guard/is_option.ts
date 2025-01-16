import {
    type Option,
    isSome,
    isNone
} from "@root";

export function isOption(unknown: unknown): unknown is Option<unknown> {
    return isSome(unknown) || isNone(unknown);
}
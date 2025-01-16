import type {
    ErrValOf,
    Err,
    ResultArray
} from "@core";

export type ErrValOfAll<T1 extends ResultArray<unknown, unknown>> = {
    [T2 in keyof T1]: T1[T2] extends Err<unknown> ? ErrValOf<T1[T2]> : never
};
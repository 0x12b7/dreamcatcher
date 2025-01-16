import type {
    ErrOf,
    Err,
    ResultArray
} from "@core";

export type ErrOfAll<T1 extends ResultArray<unknown, unknown>> = {
    [T2 in keyof T1]: T1[T2] extends Err<unknown> ? ErrOf<T1[T2]> : never
};
import type {
    Result,
    Err
} from "@core";

export type ErrOf<T1 extends Result<unknown, unknown>> = T1 extends Err<infer T2> ? Err<T2> : never;
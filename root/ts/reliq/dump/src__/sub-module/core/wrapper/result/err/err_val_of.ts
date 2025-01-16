import type {
    Result,
    Err
} from "@core";

export type ErrValOf<T1 extends Result<unknown, unknown>> = T1 extends Err<infer T2> ? T2 : never;
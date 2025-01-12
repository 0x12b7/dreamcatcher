import type { ErrValOf } from "@root";
import type { Result } from "@root";
import { Err } from "@root";

export type ErrValOfAll<T1 extends Array<Result<unknown, unknown>>> = {
    [T2 in keyof T1]: T1[T2] extends Err<unknown> ? ErrValOf<T1[T2]> : never
};
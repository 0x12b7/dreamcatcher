import type { ErrOf } from "@core";
import type { Err } from "@core";
import type { Result } from "@core";

export type ErrOfAll<T1 extends Array<Result<unknown, unknown>>> = {
    [T2 in keyof T1]: T1[T2] extends Err<unknown> ? ErrOf<T1[T2]> : never
};
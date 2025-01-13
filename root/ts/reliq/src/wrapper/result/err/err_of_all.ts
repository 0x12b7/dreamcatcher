import type { ErrOf } from "@root";
import type { Result } from "@root";
import type { Err } from "@root";

type ErrOfAll<T1 extends Array<Result<unknown, unknown>>> = {
    [T2 in keyof T1]: T1[T2] extends Err<unknown> ? ErrOf<T1[T2]> : never
};

export type { ErrOfAll };
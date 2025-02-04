import type { ErrValOf } from "@root";
import type { Result } from "@root";

export type ErrValOfAll<T1 extends Array<Result<unknown, unknown>>> = {
    [T2 in keyof T1]: ErrValOf<T1[T2]>;
};
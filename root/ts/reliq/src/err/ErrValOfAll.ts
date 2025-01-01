import type { ErrValOf } from "@root";
import type { Result } from "@root";
import { Err } from "@root";

export type ErrValOfAll<T extends Array<Result<unknown, unknown>>> = {
    [k in keyof T]: T[k] extends Err<unknown> ? ErrValOf<T[k]> : never
};
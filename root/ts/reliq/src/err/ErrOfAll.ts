import type { ErrOf } from "@root";
import type { Result } from "@root";
import { Err } from "@root";

export type ErrOfAll<T extends Array<Result<unknown, unknown>>> = {
    [k in keyof T]: T[k] extends Err<unknown> ? ErrOf<T[k]> : never
};
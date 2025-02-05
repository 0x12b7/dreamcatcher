import type { OkOf } from "@root";
import type { Ok } from "@root";
import type { Result } from "@root";

export type OkOfAll<T1 extends Array<Result<unknown, unknown>>> = {
    [T2 in keyof T1]: T1[T2] extends Ok<unknown> ? OkOf<T1[T2]> : never;
};
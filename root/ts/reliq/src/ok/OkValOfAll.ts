import type { OkValOf } from "@root";
import type { Result } from "@root";
import { Ok } from "@root";

export type OkValOfAll<T extends Array<Result<unknown, unknown>>> = {
    [k in keyof T]: T[k] extends Ok<unknown> ? OkValOf<T[k]> : never
};
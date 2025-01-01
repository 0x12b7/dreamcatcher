import type { OkOf } from "@root";
import type { Result } from "@root";
import { Ok } from "@root";

export type OkOfAll<T extends Array<Result<unknown, unknown>>> = {
    [k in keyof T]: T[k] extends Ok<unknown> ? OkOf<T[k]> : never;
};
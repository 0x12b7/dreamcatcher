import {
    type OkValOf,
    type Result,
    Ok
} from "@root";

export type OkValOfAll<T1 extends Array<Result<unknown, unknown>>> = {
    [T2 in keyof T1]: T1[T2] extends Ok<unknown> ? OkValOf<T1[T2]> : never
};
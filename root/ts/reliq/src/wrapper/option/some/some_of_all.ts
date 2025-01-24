import type { Some } from "@root";
import type { SomeOf } from "@root";
import type { Option } from "@root";

/**
 * ***Brief***
 * Extracts the values of all `Some` instances from an array of `Option` types, resulting in a tuple of their values, excluding `None`.
 */
export type SomeOfAll<T1 extends Array<Option<unknown>>> = {
    [T2 in keyof T1]: T1[T2] extends Some<unknown> ? SomeOf<T1[T2]> : never
};
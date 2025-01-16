import type { SomeOf } from "@root";
import type { Option } from "@root";
import type { Some } from "@root";

type SomeOfAll<T1 extends Array<Option<unknown>>> = {
    [T2 in keyof T1]: T1[T2] extends Some<unknown> ? SomeOf<T1[T2]> : never
};

export type { SomeOfAll };
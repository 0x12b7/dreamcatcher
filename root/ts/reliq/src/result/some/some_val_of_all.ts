import type { SomeValOf } from "@root";
import type { Option } from "@root";
import { Some } from "@root";

export type SomeValOfAll<T1 extends Array<Option<unknown>>> = {
    [T2 in keyof T1]: T1[T2] extends Some<unknown> ? SomeValOf<T1[T2]> : never
};
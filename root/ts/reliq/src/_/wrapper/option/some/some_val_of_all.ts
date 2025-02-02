import type { SomeValOf } from "@root";
import type { Option } from "@root";

export type SomeValOfAll<T1 extends Array<Option<unknown>>> = {
    [T2 in keyof T1]: SomeValOf<T1[T2]>;
};
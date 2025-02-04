import type { SomeValOf } from "@core";
import type { Option } from "@core";

export type SomeValOfAll<T1 extends Array<Option<unknown>>> = {
    [T2 in keyof T1]: SomeValOf<T1[T2]>;
};
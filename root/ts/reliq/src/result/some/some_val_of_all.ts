import type { SomeValOf } from "@root";
import type { Option } from "@root";
import { Some } from "@root";

export type SomeValOfAll<T extends Array<Option<unknown>>> = {
    [k in keyof T]: T[k] extends Some<unknown> ? SomeValOf<T[k]> : never
};
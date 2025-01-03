import type { SomeOf } from "@root";
import type { Option } from "@root";
import { Some } from "@root";

export type SomeOfAll<T extends Array<Option<unknown>>> = {
    [k in keyof T]: T[k] extends Some<unknown> ? SomeOf<T[k]> : never
};
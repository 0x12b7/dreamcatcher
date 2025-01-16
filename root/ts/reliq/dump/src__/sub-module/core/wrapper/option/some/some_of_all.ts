import type {
    Some,
    SomeOf,
    OptionArray
} from "@core";

export type SomeOfAll<T1 extends OptionArray<unknown>> = {
    [T2 in keyof T1]: T1[T2] extends Some<unknown> ? SomeOf<T1[T2]> : never
};
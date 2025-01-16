import type {
    OptionArray,
    Some,
    SomeValOf
} from "@core";

export type SomeValOfAll<T1 extends OptionArray<unknown>> = {
    [T2 in keyof T1]: T1[T2] extends Some<unknown> ? SomeValOf<T1[T2]> : never
};
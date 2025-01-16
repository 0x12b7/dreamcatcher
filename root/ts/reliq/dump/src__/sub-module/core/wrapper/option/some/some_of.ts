import {
    type Option,
    type Some
} from "@core";

export type SomeOf<T1 extends Option<unknown>> = T1 extends Some<infer T2> ? Some<T2> : never;
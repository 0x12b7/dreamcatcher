import {
    type Option,
    type Some
} from "@root";

export type SomeValOf<T1 extends Option<unknown>> = T1 extends Some<infer T2> ? T2 : never;
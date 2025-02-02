import type { Option } from "@core";
import type { Some } from "@core";

export type SomeValOf<T1 extends Option<unknown>> = T1 extends Some<infer T2> ? T2 : never;
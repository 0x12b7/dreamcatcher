import type { Option } from "@root";
import { Some } from "@root";

export type SomeOf<T1 extends Option<unknown>> = T1 extends Some<infer T2> ? Some<T2> : never;
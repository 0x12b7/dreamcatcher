import type { Option } from "@root";
import { Some } from "@root";

export type SomeOf<T extends Option<unknown>> = T extends Some<infer X> ? Some<X> : never;
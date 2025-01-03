import type { Option } from "@root";
import type { Some } from "@root";

export type SomeValOf<T extends Option<unknown>> = T extends Some<infer X> ? X : never;
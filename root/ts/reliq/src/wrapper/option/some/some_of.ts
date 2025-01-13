import type { Option } from "@root";
import type { Some } from "@root";

type SomeOf<T1 extends Option<unknown>> = T1 extends Some<infer T2> ? Some<T2> : never;

export type { SomeOf };
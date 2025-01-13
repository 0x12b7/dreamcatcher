import type { Option } from "@root";
import type { Some } from "@root";

type SomeValOf<T1 extends Option<unknown>> = T1 extends Some<infer T2> ? T2 : never;

export type { SomeValOf };
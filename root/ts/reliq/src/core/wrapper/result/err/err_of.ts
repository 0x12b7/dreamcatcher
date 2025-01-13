import type { Result } from "@root";
import type { Err } from "@root";

type ErrOf<T1 extends Result<unknown, unknown>> = T1 extends Err<infer T2> ? Err<T2> : never;

export type { ErrOf };
import type { Result } from "@root";
import { Err } from "@root";

export type ErrOf<T1 extends Result<unknown, unknown>> = T1 extends Err<infer T2> ? Err<T2> : never;
import type { Result } from "@root";
import type { Err } from "@root";

export type ErrValOf<T1 extends Result<unknown, unknown>> = T1 extends Err<infer T2> ? T2 : never;
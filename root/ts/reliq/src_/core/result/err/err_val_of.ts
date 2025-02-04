import type { Result } from "@core";
import type { Err } from "@core";

export type ErrValOf<T1 extends Result<unknown, unknown>> = T1 extends Err<infer T2> ? T2 : never;
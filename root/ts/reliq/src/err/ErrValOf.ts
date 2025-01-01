import type { Result } from "@root";
import { Err } from "@root";

export type ErrValOf<T extends Result<unknown, unknown>> = T extends Err<infer X> ? X : never;
import type { Result } from "@root";
import { Err } from "@root";

export type ErrOf<T extends Result<unknown, unknown>> = T extends Err<infer X> ? Err<X> : never;
import type { Result } from "@root";
import { Ok } from "@root";

export type OkOf<T extends Result<unknown, unknown>> = T extends Ok<infer X> ? Ok<X> : never;
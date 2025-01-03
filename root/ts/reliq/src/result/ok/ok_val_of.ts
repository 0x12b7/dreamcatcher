import type { Result } from "@root";
import { Ok } from "@root";

export type OkValOf<T extends Result<unknown, unknown>> = T extends Ok<infer X> ? X : never;
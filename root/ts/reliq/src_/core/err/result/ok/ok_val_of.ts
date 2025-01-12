import type { Result } from "@root";
import { Ok } from "@root";

export type OkValOf<T1 extends Result<unknown, unknown>> = T1 extends Ok<infer T2> ? T2 : never;
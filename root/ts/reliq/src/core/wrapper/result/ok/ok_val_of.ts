import type { Result } from "@core";
import { Ok } from "@core";

export type OkValOf<T1 extends Result<unknown, unknown>> = T1 extends Ok<infer T2> ? T2 : never;
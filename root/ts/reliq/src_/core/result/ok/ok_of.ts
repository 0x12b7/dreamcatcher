import type { Result } from "@core";
import { Ok } from "@core";

export type OkOf<T1 extends Result<unknown, unknown>> = T1 extends Ok<infer T2> ? Ok<T2> : never;
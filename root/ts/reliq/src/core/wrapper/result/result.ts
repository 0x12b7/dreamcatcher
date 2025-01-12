import type { Ok } from "@core";
import type { Err } from "@core";

export type Result<T1, T2> = Ok<T1> | Err<T2>;
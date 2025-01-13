import type { Ok } from "@root";
import type { Err } from "@root";

type Result<T1, T2> = Ok<T1> | Err<T2>;

export type { Result };
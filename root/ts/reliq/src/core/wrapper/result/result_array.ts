import type { Result } from "@root";

type ResultArray<T1, T2> = Array<Result<T1, T2>>;

export type { ResultArray };
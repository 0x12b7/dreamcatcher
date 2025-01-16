import type { Result } from "@root";

type AsyncResult<T1, T2> = Promise<Result<T1, T2>>;

export type { AsyncResult };
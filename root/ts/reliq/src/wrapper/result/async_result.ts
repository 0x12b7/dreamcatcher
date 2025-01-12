import type { Result } from "@root";

export type AsyncResult<T1, T2> = Promise<Result<T1, T2>>;
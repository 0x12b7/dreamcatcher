import type { Result } from "@core";

export type AsyncResult<T1, T2> = Promise<Result<T1, T2>>;
import type { AsyncFunction } from "@root";
import { Result } from "@root";

export function wrapAsyncR<T, E = unknown>(op: AsyncFunction<void, T>): Promise<Result<T, E>> {
    return Result.wrapAsync(op);
}
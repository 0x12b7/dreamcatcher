import type { AsyncFunction } from "@root";
import { Option } from "@root";

export function wrapAsyncO<T>(op: AsyncFunction<void, T>): Promise<Option<T>> {
    return Option.wrapAsync(op);
}
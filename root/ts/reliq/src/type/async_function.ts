import type { Function } from "@root";

/**
 * ***Brief***
 * A type alias for a `Function` that supports asynchronous operation.
 * 
 * ***Example***
 * ```ts
 *  const fetch: AsyncFunction<string, unknown> = async (url: string) => /// ...;
 * ```
 */
export type AsyncFunction<T1, T2> = Function<T1, Promise<T2>>;
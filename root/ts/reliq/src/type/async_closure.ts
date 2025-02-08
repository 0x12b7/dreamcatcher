import { type Closure } from "@root";

/**
 * ***Brief***
 * A type alias for a `Closure` that supports asynchronous operations.
 * 
 * ***Example***
 * ```ts
 *  const fetch: AsyncClosure<[string], unknown> = async (url: string) => /// ...;
 * ```
 */
export type AsyncClosure<T1 extends Array<unknown>, T2> = Closure<T1, Promise<T2>>;

/**
 * ***Brief***
 * Represents a generic function type that takes a single argument and returns a value.
 * 
 * ***Example***
 * ```ts
 *  const addOne: Function<bigint, bigint> = (x: bigint) => x += 1n;
 * ```
 */
export type Function<T1, T2> = (payload: T1) => T2;
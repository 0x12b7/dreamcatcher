/**
 * ***Brief***
 * Represents a callable function type that accepts an array of arguments and returns a specified type.
 * 
 * ***Example***
 * ```ts
 *  const add: Closure<[bigint, bigint], bigint> = (x: bigint, y: bigint) => x + y;
 * ```
 */
export type Closure<T1 extends Array<unknown>, T2> = (...payload: T1) => T2;
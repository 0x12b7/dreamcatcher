/**
 * ***Brief***
 * A value that can either be resolved immediately or asynchronously.
 */
export type MaybeAsync<T1> = Promise<T1> | T1;
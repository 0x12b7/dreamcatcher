type Closure<T1 extends Array<unknown>, T2> = (...payload: T1) => T2;

export type { Closure };
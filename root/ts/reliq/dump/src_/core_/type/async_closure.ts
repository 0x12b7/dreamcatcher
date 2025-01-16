import type { Closure } from "@root";

type AsyncClosure<T1 extends Array<unknown>, T2> = Closure<T1, T2>;

export type { AsyncClosure };
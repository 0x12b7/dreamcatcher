import type { Function } from "@root";

type AsyncFunction<T1, T2> = Function<T1, Promise<T2>>;

export type { AsyncFunction };
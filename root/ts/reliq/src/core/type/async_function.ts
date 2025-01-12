import type { Function } from "@core";

export type AsyncFunction<T1, T2> = Function<T2, Promise<T2>>;
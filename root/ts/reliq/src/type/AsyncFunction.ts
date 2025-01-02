import type { Function } from "@root";

export type AsyncFunction<T, X> = Function<T, Promise<X>>;
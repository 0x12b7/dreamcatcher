import type { Dyn } from "@root";
import type { Closure } from "@root";

export type DynConstructor<T1, T2 extends Array<unknown>> = Closure<T2, Dyn<T1>>;
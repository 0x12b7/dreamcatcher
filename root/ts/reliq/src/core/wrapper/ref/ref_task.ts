import type { Closure } from "@root";

export type RefTask<T1> = Closure<[new: T1, old: T1], void>;
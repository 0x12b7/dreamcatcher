import type { Fpv } from "@root";

export type FpvIsh<T1 extends bigint = 2n> = Fpv<T1> | bigint;
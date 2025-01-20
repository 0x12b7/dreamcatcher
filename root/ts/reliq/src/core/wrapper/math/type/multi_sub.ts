import type { Add } from "./add";
import type { Sub } from "./sub";
import type { Lt } from "./lt";

export type MultiSub<
    N extends number, D extends number, Q extends number
> = Lt<N, D> extends true
    ? Q
    : MultiSub<Sub<N, D>, D, Add<Q, 1>>;

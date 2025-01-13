import type { Closure } from "@root";
import type { Vec } from "@root";

export type Sequence<T1> = {
    join(separator?: string): string;
    slice(k0: bigint, k1: bigint): Vec<T1>;
    sort(compare: Closure<[x: T1, y: T1], bigint>): Vec<T1>;
    forEach(hook: Closure<[v: T1, k: bigint], void>): Vec<T1>;
}
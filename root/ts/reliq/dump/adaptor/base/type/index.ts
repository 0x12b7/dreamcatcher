import type { Closure } from "@root";
import type { Option } from "@root";

export type Index<T1> = {
    has(v: T1): boolean;
    has(v: T1, k0: bigint): boolean;
    has(v: T1, k0: bigint, k1: bigint): boolean;
    positionOf(v: T1): Option<bigint>;
    find<T2>(hook: Closure<[v: T1, k: bigint], T2>): Option<T1>;
};
import type { Closure } from "@root";
import type { Option } from "@root";

export type Index<T1> = {
    includes(v: T1): boolean;
    includes(v: T1, fromPosition: bigint): boolean;
    indexOf(v: T1): bigint;
    
    find<T2>(hook: Closure<[v: T1, k: bigint], T2>): Option<T1>;
};
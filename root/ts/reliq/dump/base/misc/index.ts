import type { Closure } from "@root";
import type { Option } from "@root";

export type Index<T1> = {
    has(item: T1): boolean;
    has(item: T1, fromPosition: bigint): boolean;
    has(
        item: T1,
        fromPosition?: bigint
    ): boolean;
    positionOf(item: T1): Option<bigint>;
    positionOf(item: T1, fromPosition: bigint): Option<bigint>;
    positionOf(
        item: T1,
        fromPosition?: bigint
    ): Option<bigint>;
    find<T2>(op: Closure<[item: T1, position: bigint], T2>): Option<T1>;
};
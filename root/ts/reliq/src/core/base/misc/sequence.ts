import type { Closure } from "@root";
import type { Vec } from "@root";

export type Sequence<T1> = {
    join(): string;
    join(separator: string): string;
    join(
        separator?: string
    ): string;
    slice(): Vec<T1>;
    slice(startPosition: bigint): Vec<T1>;
    slice(startPosition: bigint, endPosition: bigint): Vec<T1>;
    slice(
        startPosition?: bigint,
        endPosition?: bigint
    ): Vec<T1>;
    sort(): Vec<T1>;
    sort(op: Closure<[item0: T1, item1: T1], bigint>): Vec<T1>;
    sort(
        op?: Closure<[item0: T1, item1: T1], void>
    ): Vec<T1>;
    map<T2>(op: Closure<[item: T1, position: bigint], T2>): Vec<T2>;
}
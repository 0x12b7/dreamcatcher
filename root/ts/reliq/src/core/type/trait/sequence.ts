import {
    type Option,
    type Closure
} from "@root";

export type Sequence<T1> = {
    at(position: bigint): Option<T1>;
    length(): bigint;
    concat(sequence: T1): T1;
    pop(): T1;
    push(item: T1): bigint;
    push(items: T1): bigint;
    shift(): T1;
    unshift(item: T1): bigint;
    unshift(... items: Array<T1>): bigint;
    slice(position: bigint): Option<T1>;
    slice(position: bigint, count: bigint): Option<T1>;
    join(): string;
    join(separator: string): string;
    sort(comparison: Closure<[value0: T1, value1: T1], bigint>): Sequence<T1>;
    map<T2>(operation: Closure<[value: T1, key: bigint], T2>): Sequence<T2>;
};
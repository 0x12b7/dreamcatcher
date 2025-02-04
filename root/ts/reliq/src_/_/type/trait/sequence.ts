import {
    type Option,
    type Closure
} from "@root";

export type SequenceIsh<T1> = Sequence<T1> | Array<T1>;

export type Sequence<T1> = {
    has(value: T1): boolean;
    has(value: T1, fromPosition: bigint): boolean;
    has(value: T1, fromPosition: bigint, toPosition: bigint): boolean;
    positionOf(value: T1): Option<bigint>;
    positionOf(value: T1, fromPosition: bigint): Option<bigint>;
    positionOf(value: T1, fromPosition: bigint, toPosition: bigint): Option<bigint>;
    at(position: bigint): Option<T1>;
    length(): bigint;
    concat(sequence: SequenceIsh<T1>): Sequence<T1>;
    push(value: T1): Sequence<T1>;
    pop(): T1;
    shift(): T1;
    unshift(value: T1): Sequence<T1>;
    unshift(values: SequenceIsh<T1>): Sequence<T1>;
    unshift(... values: Array<T1>): Sequence<T1>;
    slice(position: bigint): Option<T1>;
    slice(position: bigint, count: bigint): Option<T1>;
    join(): string;
    join(separator: string): string;
    sort(task: Closure<[value0: T1, value1: T1], bigint>): Sequence<T1>;
    filter(task: Closure<[T1], boolean>): Sequence<T1>;
    reduce<T2>(task: Closure<[T2, T1], T2>, first: T2): T2;
    map<T2>(task: Closure<[T1], T2>): Sequence<T2>;
    forEach(task: Closure<[T1], void>): Sequence<T1>;
    toArray(): Array<T1>;
};
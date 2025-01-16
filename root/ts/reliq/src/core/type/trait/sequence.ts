import {
    type Option
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
};
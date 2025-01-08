import type { VecLike } from "@root";
import type { Vec } from "@root";
import type { Option } from "@root";

export type MutableCollection<T1> = {
    concat(item: T1): Vec<T1>;
    concat(... items: Array<T1>): Vec<T1>;
    concat(... items: Array<T1>): Vec<T1>;
    pop(): Option<T1>;
    push(item: T1): bigint;
    push(... items: Array<T1>): bigint;
    push(... items: Array<T1>): bigint;
    reverse(): Vec<T1>;
    shift(): Option<T1>;
    unshift(item: T1): bigint;
    unshift(... items: Array<T1>): bigint;
    unshift(... items: Array<T1>): bigint;
    splice(position: bigint): Vec<T1>;
    splice(position: bigint, deleteCount: bigint): Vec<T1>;
    splice(
        position: bigint, 
        deleteCount?: bigint
    ): Vec<T1>;
};
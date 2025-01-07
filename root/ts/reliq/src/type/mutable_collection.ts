import { Vec } from "@root";
import { Option } from "@root";

export type MutableCollection<T1> = {
    concat(v: Vec<T1>): Vec<T1>;
    pop(): Option<T1>;
    push(v: Vec<T1>): bigint;
    reverse(): Vec<T1>;
    shift(): Option<T1>;
    unshift(v: Vec<T1>): Option<T1>;
    splice(startPosition: bigint): Vec<T1>;
    splice(startPosition: bigint, deleteCount: bigint): Vec<T1>;
};
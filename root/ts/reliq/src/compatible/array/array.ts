import type { Closure } from "@root";
import { Option } from "@root";
import { Some } from "@root";
import { None } from "@root";

export type Vec<T1> = {
    length(): bigint;
    at(k: bigint): Option<T1>;
    concat(... v: Array<T1>): Vec<T1>;
    includes(v: T1, fromPosition?: bigint): boolean;
    indexOf(item: T1, fromPosition?: bigint): bigint;
    lastIndexOf(item: T1, fromPosition?: bigint): bigint;
    join(separator?: string): string;
    slice(startPosition?: bigint, endPosition?: bigint): Vec<T1>;
    toArray(): Array<T1>;
    toString(): string;
    toLocaleString(): string;
    pop(): Option<T1>;
    push(... v: Array<T1>): bigint;
    reverse(): Vec<T1>;
    shift(): Option<T1>;
    unshift(... v: Array<T1>): Option<T1>;
    sort(compare: Closure<[x: T1, y: T1], bigint>): Vec<T1>;
    splice(startPosition: bigint, deleteCount?: bigint): Vec<T1>;
    splice(startPosition: bigint, deleteCount: bigint, ... v: Array<T1>): Vec<T1>;
    forEach(fn: Closure<[item: T1, k: bigint], void>): Vec<T1>;
};

export function Vec<T1>(_v: Array<T1>): Vec<T1> {

    /** @constructor */ {
        return {
            length
        };
    }

    function length(): bigint {
        return _length(_v);
    }

    function at(k: bigint): Option<T1> {
        return _at(_v, k);
    }
}

function _length<T1>(v: Array<T1>): bigint {

}

function _at<T1>(arr: Array<T1>, k: bigint): Option<T1> {
    let item: T1 | undefined = arr.at(Number(k));
    if (item) return Some(item);
    return None;
}


let vec0: Vec<number> = Vec([500]);
let vec1: Vec<number> = Vec([200]);

vec0.push(... vec1.toArray())

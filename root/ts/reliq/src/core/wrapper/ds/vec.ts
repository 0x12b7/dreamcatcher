import type { Closure } from "@root";
import type { Wrapper } from "@root";
import type { SequenceIsh } from "@root";
import type { Sequence } from "@root";
import type { Option } from "@root";
import { Some } from "@root";
import { None } from "@root";

export type Vec<T1> =
    & Wrapper<Array<T1>>
    & Sequence<T1>;

export function Vec<T1>(_value: SequenceIsh<T1>): Vec<T1> {
    let _this: Vec<T1>;
    let _inner: Array<T1>;

    /** @constructor */ {
        _this = {
            unwrap,
            toArray,
            toString,
            toLocaleString,
            concat,
            pop,
            push,
            reverse,
            shift,
            unshift,
            splice,
            length,
            at,
            has,
            positionOf,
            find,
            join,
            slice,
            sort,
            map
        };
        return _this;
    }


    function unwrap(): Array<T1> {
        return _value;
    }


    function toArray(): Array<T1> {
        return [... unwrap()];
    }

    function toString(): string {
        return _value.toString();
    }

    function toLocaleString(): string {
        return _value.toLocaleString();
    }

    function concat(value: T1): Vec<T1>;
    function concat(... values: Array<T1>): Vec<T1>;
    function concat(... items: Array<T1>): Vec<T1> {
        return Vec(_value.concat(... items));
    }

    function pop(): Option<T1> {
        let item: 
            | T1 
            | undefined 
            = _value.pop();
        if (item) return Some(item);
        return None;
    }

    function push(item: T1): bigint;
    function push(... items: Array<T1>): bigint;
    function push(... items: Array<T1>): bigint {
        let n: number = _value.push(... items);
        return BigInt(n);
    }

    function reverse(): Vec<T1> {
        _value.reverse();
        return _this;
    }

    function shift(): Option<T1> {
        let x: 
            | T1 
            | undefined 
            = _value.shift();
        if (x) return Some(x);
        return None;
    }

    function unshift(item: T1): bigint;
    function unshift(... items: Array<T1>): bigint;
    function unshift(... items: Array<T1>): bigint {
        let n: number = _value.unshift(... items);
        return BigInt(n);
    }

    function splice(position: bigint): Vec<T1>;
    function splice(position: bigint, deleteCount: bigint): Vec<T1>;
    function splice(
        k: bigint, 
        deleteCount?: bigint
    ): Vec<T1> {
        let x: Array<T1> = _value.splice(Number(k), deleteCount ? Number(deleteCount) : undefined);
        return Vec(x);
    }

    function length(): bigint {
        let n: number = _value.length;
        return BigInt(n);
    }

    function at(k: bigint): Option<T1> {
        let x: T1 | undefined = _value.at(Number(k));
        if (x) return Some(x);
        return None;
    }

    function has(v: T1): boolean;
    function has(v: T1, k0: bigint): boolean;
    function has(
        v: T1,
        k0?: bigint
    ): boolean {
        return _value.includes(v, Number(k0));
    }

    function positionOf(v: T1): Option<bigint>;
    function positionOf(v: T1, fromPosition: bigint): Option<bigint>;
    function positionOf(
        v: T1,
        fromPosition?: bigint
    ): Option<bigint> {
        let n: number = _value.indexOf(v, fromPosition ? Number(fromPosition) : undefined);
        if (n === -1) return None;
        return Some(BigInt(n));
    }

    function find<T2>(op: Closure<[item: T1, position: bigint], T2>): Option<T1> {
        let x:
            | T1
            | undefined 
            = _value.find((v, k) => op(v, BigInt(k)));
        if (x) return Some(x);
        return None;
    }

    function join(): string;
    function join(separator: string): string;
    function join(
        separator?: string
    ): string {
        return _value.join();
    }

    function slice(): Vec<T1>;
    function slice(startPosition: bigint): Vec<T1>;
    function slice(startPosition: bigint, endPosition: bigint): Vec<T1>;
    function slice(
        startPosition?: bigint,
        endPosition?: bigint
    ): Vec<T1> {
        let x: Array<T1> = _value.slice(startPosition ? Number(startPosition) : undefined, endPosition ? Number(endPosition) : undefined);
        return Vec(x);
    }

    function sort(): Vec<T1>;
    function sort(op: Closure<[item0: T1, item1: T1], bigint>): Vec<T1>;
    function sort(
        op?: Closure<[item0: T1, item1: T1], bigint>
    ): Vec<T1> {
        if (op) {
            let x: Array<T1> = _value.sort((x, y) => Number(op(x, y)));
            return Vec(x);
        }
        let x: Array<T1> = _value.sort();
        return Vec(x);
    }

    function map<T2>(op: Closure<[item: T1, position: bigint], T2>): Vec<T2> {
        let result: Vec<T2> = Vec([]);
        _value.map((v, k) => result.push(op(v, BigInt(k))));
        return result;
    }
}
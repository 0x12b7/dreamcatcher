import type { Closure } from "@root";
import type { Wrapper } from "@root";
import type { Polymorph } from "@root";
import type { MutableCollection } from "@root";
import type { Span } from "@root";
import type { Index } from "@root";
import type { Sequence } from "@root";
import { Option } from "@root";
import { Some } from "@root";
import { None } from "@root";

export type Vec<T1> =
    & Wrapper<Array<T1>>
    & Polymorph<T1>
    & MutableCollection<T1>
    & Span<T1>
    & Index<T1>
    & Sequence<T1>;

export function Vec<T1>(_v: Array<T1>): Vec<T1> {
    let _instance: Vec<T1>;

    /** @constructor */ {
        _instance = {
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
        return _instance;
    }

    function unwrap(): Array<T1> {
        return _v;
    }

    function toArray(): Array<T1> {
        return [... unwrap()];
    }

    function toString(): string {
        return _v.toString();
    }

    function toLocaleString(): string {
        return _v.toLocaleString();
    }

    function concat(item: T1): Vec<T1>;
    function concat(... items: Array<T1>): Vec<T1>;
    function concat(... items: Array<T1>): Vec<T1> {
        return Vec(_v.concat(... items));
    }

    function pop(): Option<T1> {
        let item: T1 | undefined = _v.pop();
        if (item) return Some(item);
        return None;
    }

    function push(item: T1): bigint;
    function push(... items: Array<T1>): bigint;
    function push(... items: Array<T1>): bigint {
        let n: number = _v.push(... items);
        return BigInt(n);
    }

    function reverse(): Vec<T1> {
        _v.reverse();
        return _instance;
    }

    function shift(): Option<T1> {
        let x: 
            | T1 
            | undefined 
            = _v.shift();
        if (x) return Some(x);
        return None;
    }

    function unshift(item: T1): bigint;
    function unshift(... items: Array<T1>): bigint;
    function unshift(... items: Array<T1>): bigint {
        let n: number = _v.unshift(... items);
        return BigInt(n);
    }

    function splice(position: bigint): Vec<T1>;
    function splice(position: bigint, deleteCount: bigint): Vec<T1>;
    function splice(
        k: bigint, 
        deleteCount?: bigint
    ): Vec<T1> {
        let x: Array<T1> = _v.splice(Number(k), deleteCount ? Number(deleteCount) : undefined);
        return Vec(x);
    }

    function length(): bigint {
        let n: number = _v.length;
        return BigInt(n);
    }

    function at(k: bigint): Option<T1> {
        let x: T1 | undefined = _v.at(Number(k));
        if (x) return Some(x);
        return None;
    }

    function has(v: T1): boolean;
    function has(v: T1, k0: bigint): boolean;
    function has(
        v: T1,
        k0?: bigint
    ): boolean {
        return _v.includes(v, Number(k0));
    }

    function positionOf(v: T1): Option<bigint>;
    function positionOf(v: T1, fromPosition: bigint): Option<bigint>;
    function positionOf(
        v: T1,
        fromPosition?: bigint
    ): Option<bigint> {
        let n: number = _v.indexOf(v,);
        if (n === -1) return None;
        return Some(BigInt(n));
    }

    function find<T2>(op: Closure<[item: T1, position: bigint], T2>): Option<T1> {
        let x:
            | T1
            | undefined 
            = _v.find((v, k) => op(v, BigInt(k)));
        if (x) return Some(x);
        return None;
    }

    function join(): string;
    function join(separator: string): string;
    function join(
        separator?: string
    ): string {
        return _v.join();
    }

    function slice(): Vec<T1>;
    function slice(startPosition: bigint): Vec<T1>;
    function slice(startPosition: bigint, endPosition: bigint): Vec<T1>;
    function slice(
        startPosition?: bigint,
        endPosition?: bigint
    ): Vec<T1> {
        let x: Array<T1> = _v.slice(startPosition ? Number(startPosition) : undefined, endPosition ? Number(endPosition) : undefined);
        return Vec(x);
    }

    function sort(): Vec<T1>;
    function sort(op: Closure<[item0: T1, item1: T1], bigint>): Vec<T1>;
    function sort(
        op?: Closure<[item0: T1, item1: T1], bigint>
    ): Vec<T1> {
        if (op) {
            let x: Array<T1> = _v.sort((x, y) => Number(op(x, y)));
            return Vec(x);
        }
        let x: Array<T1> = _v.sort();
        return Vec(x);
    }

    function map<T2>(op: Closure<[item: T1, position: bigint], T2>): Vec<T2> {
        let result: Vec<T2> = Vec([]);
        _v.map((v, k) => result.push(op(v, BigInt(k))));
        return result;
    }
}
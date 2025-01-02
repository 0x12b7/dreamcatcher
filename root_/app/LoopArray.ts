import type { Maybe } from "@root";
import { some } from "@root";
import { require } from "@root";
import { assert } from "@root";

export type LoopArrayError =
    | "LOOP_ARRAY.ERR_NO_VALUE"
    | "LOOP_ARRAY.ERR_INVALID_POSITION";

export type LoopArray<T> = {
    cursor(): bigint;
    length(): bigint;
    startPosition(): bigint;
    finalPosition(): bigint;
    last(): T;
    get(): T;
    next(): T;
    prev(): T;
    move(position: bigint): T;
    moveByAmount(amount: bigint): T;
    insert(v: T): void;
    remove(): void;
    removeByPosition(position: bigint): void;
};

export function LoopArray<T>(_v: Array<T>): LoopArray<T> {
    let _cursor: bigint = 0n;
    
    /** @constructor */ {
        return {
            cursor,
            length,
            startPosition,
            finalPosition,
            last,
            get,
            next,
            prev,
            move,
            moveByAmount,
            insert,
            remove,
            removeByPosition
        };
    }

    function cursor(): bigint {
        return _cursor;
    }
    
    function length(): bigint {
        let n: number = _v.length;
        return BigInt(n);
    }

    function startPosition(): bigint {
        return 0n;
    }

    function finalPosition(): bigint {
        let n: number = _v.length - 1;
        return BigInt(n);
    }

    function last(): T {
        return move(finalPosition());
    }

    function get(): T {
        let v: Maybe<T> = _v.at(Number(_cursor))!;
        assert<LoopArrayError>(some(v), "LOOP_ARRAY.ERR_NO_VALUE");
        return v;
    }

    function next(): T {
        let over: boolean = _cursor + 1n === finalPosition() + 1n;
        if (over) {
            _cursor = startPosition();
        }
        else _cursor += 1n;
        return get();
    }

    function prev(): T {
        let undr: boolean = _cursor - 1n === startPosition() - 1n;
        if (undr) {
            _cursor = finalPosition();
        }
        else _cursor -= 1n;
        return get();
    }

    function move(position: bigint): T {
        _checkPosition(position);
        _cursor = position;
        return get();
    }

    function moveByAmount(amount: bigint): T {
        if (amount === 0n) return get();
        let forward: boolean = amount > 0n;
        if (forward) {
            let i: bigint = 0n;
            while (i < amount) {
                next();
                i++;
            }
            return get();
        }
        else {
            let i: bigint = amount;
            while (i > amount) {
                prev();
                i--;
            }
            return get();
        }
    }

    function insert(v: T): void {
        _v.push(v);
        return;
    }

    function remove(): void {
        _v.pop();
        return;
    }

    function removeByPosition(position: bigint): void {
        _checkPosition(position);
        _v.splice(Number(position), 1);
        return;
    }

    function _checkPosition(position: bigint): void {
        require<LoopArrayError>(position >= startPosition(), "LOOP_ARRAY.ERR_INVALID_POSITION");
        require<LoopArrayError>(position <= finalPosition(), "LOOP_ARRAY.ERR_INVALID_POSITION");
        return;
    }
}
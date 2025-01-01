import type { Maybe } from "@root";
import { some } from "@root";
import { require } from "@root";
import { assert } from "@root";

export type LoopArrayError =
    | "LOOP_ARRAY.ERR_NO_VALUE"
    | "LOOP_ARRAY.ERR_INVALID_POSITION";

export type LoopArray<T> = {
    cursor(): bigint;
    get(): T;
    next(): T;
    prev(): T;
    move(position: bigint): T;
    moveByAmount(amount: bigint): T;
};

export function LoopArray<T>(_v: ReadonlyArray<T>): LoopArray<T> {
    let _cursor: bigint = 0n;
    
    /** @constructor */ {
        return {
            cursor,
            get,
            next,
            prev,
            move,
            moveByAmount
        };
    }

    function cursor(): bigint {
        return _cursor;
    }
    
    function get(): T {
        let v: Maybe<T> = _v.at(Number(_cursor))!;
        assert<LoopArrayError>(some(v), "LOOP_ARRAY.ERR_NO_VALUE");
        return v;
    }

    function next(): T {
        let over: boolean = _cursor + 1n === _final() + 1n;
        if (over) {
            _cursor = _start();
        }
        else _cursor += 1n;
        return get();
    }

    function prev(): T {
        let undr: boolean = _cursor - 1n === _start() - 1n;
        if (undr) {
            _cursor = _final();
        }
        else _cursor -= 1n;
        return get();
    }

    function move(position: bigint): T {
        require<LoopArrayError>(position >= _start(), "LOOP_ARRAY.ERR_INVALID_POSITION");
        require<LoopArrayError>(position <= _final(), "LOOP_ARRAY.ERR_INVALID_POSITION");
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

    function _start(): bigint {
        return 0n;
    }

    function _final(): bigint {
        let n: number = _v.length - 1;
        return BigInt(n);
    }
}
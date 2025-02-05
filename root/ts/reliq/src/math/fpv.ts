import type { Result } from "@root";
import type { Wrapper } from "@root";
import type { Closure } from "@root";
import { INTERNAL_ERROR_MESSAGE } from "@root";
import { Err } from "@root";
import { Ok } from "@root";

type _Result0<T1, T2> = Result<T1, T2>;

export namespace Fpv {
    export type Result<T1> = _Result0<T1, ErrorCode>;

    export type ErrorCode = 
        | "FPV.ERR_DIVISION_BY_ZERO"
        | "FPV.ERR_PRECISION_IS_ZERO"
        | "FPV.ERR_PRECISION_IS_NEGATIVE";

    export type Compatible<T1 extends bigint = 2n> = Fpv<T1> | bigint;
}

export type Fpv<T1 extends bigint = 2n> = 
    & Wrapper<bigint>
    & {
    precision(): T1;
    representation(): bigint;
    eq(value: Fpv.Compatible<T1>): boolean;
    lt(value: Fpv.Compatible<T1>): boolean;
    gt(value: Fpv.Compatible<T1>): boolean;
    lteq(value: Fpv.Compatible<T1>): boolean;
    gteq(value: Fpv.Compatible<T1>): boolean;
    add(value: Fpv.Compatible<T1>): Fpv<T1>;
    sub(value: Fpv.Compatible<T1>): Fpv<T1>;
    mul(value: Fpv.Compatible<T1>): Fpv<T1>;
    div(value: Fpv.Compatible<T1>): Fpv.Result<Fpv<T1>>;
};

export function Fpv<T1 extends bigint = 2n>(_value: Fpv.Compatible<T1>, _precision: T1 = (2n as any)): Fpv.Result<Fpv<T1>> {
    /** @constructor */ {
        if (precision() === 0n) return Err("FPV.ERR_PRECISION_IS_ZERO");
        if (precision() < 0n) return Err("FPV.ERR_PRECISION_IS_NEGATIVE");
        return Ok({
            unwrap,
            precision,
            representation,
            eq,
            lt,
            gt,
            lteq,
            gteq,
            add,
            sub,
            mul,
            div
        });
    }

    function unwrap(): bigint {
        return _unwrap(_value);
    }

    function precision(): T1 {
        return _precision;
    }

    function representation(): bigint {
        return 10n**precision();
    }

    function eq(value: Fpv.Compatible<T1>): boolean {
        return _unwrap(_value) === _unwrap(value);
    }

    function lt(value: Fpv.Compatible<T1>): boolean {
        return _unwrap(_value) < _unwrap(value);
    }

    function gt(value: Fpv.Compatible<T1>): boolean {
        return _unwrap(_value) > _unwrap(value);
    }

    function lteq(value: Fpv.Compatible<T1>): boolean {
        return _unwrap(_value) <= _unwrap(value);
    }

    function gteq(value: Fpv.Compatible<T1>): boolean {
        return _unwrap(_value) >= _unwrap(value);
    }

    function add(value: Fpv.Compatible<T1>): Fpv<T1> {
        return _wrap(() => {
            return _unwrap(_value) + _unwrap(value);
        });
    }

    function sub(value: Fpv.Compatible<T1>): Fpv<T1> {
        return _wrap(() => {
            return _unwrap(_value) - _unwrap(value);
        });
    }

    function mul(value: Fpv.Compatible<T1>): Fpv<T1> {
        return _wrap(() => {
            let z: bigint = _unwrap(_value) * _unwrap(value);
            let q: bigint = z / representation();
            return q;
        });
    }

    function div(value: Fpv.Compatible<T1>): Fpv.Result<Fpv<T1>> {
        let n: bigint = _unwrap(value);
        if (n === 0n) return Err("FPV.ERR_DIVISION_BY_ZERO");
        return Ok(_wrap(() => {
            let z: bigint = _unwrap(_value) * representation();
            let q: bigint = z / n;
            return q;
        }));
    }

    function _wrap(task: Closure<[], bigint>): Fpv<T1> {
        return Fpv<T1>(task()).expect("Fpv: Failed to wrap the task result to a new `Fpv` of type `T1`." + INTERNAL_ERROR_MESSAGE);
    }

    function _unwrap(value: Fpv.Compatible<T1>): bigint {
        if (typeof value === "bigint") return value;
        return value.unwrap();
    }
}
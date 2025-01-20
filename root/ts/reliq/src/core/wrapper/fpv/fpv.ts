import type { Result } from "@root";
import type { Wrapper } from "@root";
import type { Closure } from "@root";
import type { FpvIsh } from "@root";
import type { FpvError } from "@root";
import { INTERNAL_ERROR_MESSAGE } from "@root";
import { StackTrace } from "@root";
import { Error } from "@root";
import { Ok } from "@root";
import { Err } from "@root";
import { Some } from "@root";
import { None } from "@root";

export type Fpv<T1 extends bigint = 2n> = 
    & Wrapper<bigint>
    & {
    precision(): T1;
    representation(): bigint;
    add(value: FpvIsh<T1>): Fpv<T1>;
    sub(value: FpvIsh<T1>): Fpv<T1>;
    mul(value: FpvIsh<T1>): Fpv<T1>;
    div(value: FpvIsh<T1>): Result<Fpv<T1>, FpvError>;
};

export function Fpv<T1 extends bigint = 2n>(_fpv: FpvIsh<T1>, _precision: T1 = (2n as any)): Result<Fpv<T1>, FpvError> {
    let _value: bigint;
    
    /** @constructor */ {
        if (precision() === 0n) return Err(Error({
            code: "FPV.ERR_PRECISION_IS_ZERO",
            message: Some("Fpv: Does not accept zero precision values."),
            payload: None,
            stack: Some(StackTrace(Fpv))
        }));
        if (precision() < 0n) return Err(Error({
            code: "FPV.ERR_PRECISION_IS_NEGATIVE",
            message: Some("Fpv: Does not accept negative precision values."),
            payload: None,
            stack: Some(StackTrace(Fpv))
        }));
        _value = _unwrap(_fpv);
        return Ok({
            unwrap,

            precision,
            representation,
            add,
            sub,
            mul,
            div
        });
    }

    
    function unwrap(): bigint {
        return _value;
    }


    function precision(): T1 {
        return _precision;
    }

    function representation(): bigint {
        return 10n**precision();
    }

    function add(value: FpvIsh<T1>): Fpv<T1> {
        return _wrap(() => {
            return _value + _unwrap(value);
        });
    }

    function sub(value: FpvIsh<T1>): Fpv<T1> {
        return _wrap(() => {
            return _value - _unwrap(value);
        });
    }

    function mul(value: FpvIsh<T1>): Fpv<T1> {
        return _wrap(() => {
            let z: bigint = _value * _unwrap(value);
            let q: bigint = z / representation();
            return q;
        });
    }

    function div(value: FpvIsh<T1>): Result<Fpv<T1>, FpvError> {
        let n: bigint = _unwrap(value);
        if (n === 0n) return Err(Error({
            code: "FPV.ERR_DIVISION_BY_ZERO",
            message: Some("Fpv: Cannot divide by zero."),
            payload: None,
            stack: Some(StackTrace(div))
        }));
        return Ok(_wrap(() => {
            let z: bigint = _value * representation();
            let q: bigint = z / n;
            return q;
        }));
    }

    function _wrap(task: Closure<[], bigint>): Fpv<T1> {
        return Fpv<T1>(task()).expect("" + INTERNAL_ERROR_MESSAGE);
    }

    function _unwrap(fpv: FpvIsh<T1>): bigint {
        if (typeof fpv === "bigint") return fpv;
        return fpv.unwrap();
    }
}
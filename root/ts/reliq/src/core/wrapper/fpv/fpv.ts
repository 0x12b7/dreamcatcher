import type { Result } from "@root";
import type { Wrapper } from "@root";
import type { Closure } from "@root";
import type { FpvIsh } from "@root";
import type { FpvError } from "@root";
import { INTERNAL_ERROR_MESSAGE } from "@root";
import { Error } from "@root";
import { Ok } from "@root";
import { Err } from "@root";

export type Fpv<T1 extends bigint = 2n> = 
    & Wrapper<bigint>
    & {

    /**
     * ***Brief***
     * Returns the precision of the `Fpv`.
     */
    precision(): T1;

    /**
     * ***Brief***
     * Returns the representation factor of the `Fpv`, based on its precision.
     */
    representation(): bigint;

    /**
     * ***Brief***
     * Adds a given `FpvIsh` value to the current `Fpv`.
     * 
     * ***Warning***
     * Extremely large values may cause the program to panic due to insufficient memory.
     */
    add(value: FpvIsh<T1>): Fpv<T1>;
    
    /**
     * ***Brief***
     * Subtracts a given `FpvIsh` value from the current `Fpv`.
     * 
     * ***Warning***
     * Extremely large values may cause the program to panic due to insufficient memory.
     */
    sub(value: FpvIsh<T1>): Fpv<T1>;

    /**
     * ***Brief***
     * Multiplies the current `Fpv` by a given `FpvIsh` value.
     * 
     * ***Warning***
     * Extremely large values may cause the program to panic due to insufficient memory.
     */
    mul(value: FpvIsh<T1>): Fpv<T1>;

    /**
     * ***Brief***
     * Divides the current `Fpv` by a given `FpvIsh` value.
     * 
     * ***Warning***
     * Extremely large values may cause the program to panic due to insufficient memory.
     * 
     * ***Warning***
     * If dividing by zero, an error will be returned.
     */
    div(value: FpvIsh<T1>): Result<Fpv<T1>, FpvError>;
};

/**
 * ***Brief***
 * Creates a new `Fpv` with the provided value and precision.
 */
export function Fpv<T1 extends bigint = 2n>(_fpv: FpvIsh<T1>, _precision: T1 = (2n as any)): Result<Fpv<T1>, FpvError> {
    let _value: bigint;
    
    /** @constructor */ {
        if (precision() === 0n) return Err(Error("FPV.ERR_PRECISION_IS_ZERO", "Fpv: Does not support zero precision."));
        if (precision() < 0n) return Err(Error("FPV.ERR_PRECISION_IS_NEGATIVE", "Fpv: Does not support negative precision."));
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
        if (n === 0n) return Err(Error("FPV.ERR_DIVISION_BY_ZERO", "Fpv: Cannot divide by zero."));
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
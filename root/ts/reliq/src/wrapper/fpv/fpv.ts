import type { Result as Result0 } from "@root";
import type { Wrapper } from "@root";
import type { Closure } from "@root";
import { INTERNAL_ERROR_MESSAGE } from "@root";
import { Error as Error0 } from "@root";
import { Ok } from "@root";
import { Err } from "@root";



export namespace Fpv {
    export type Result<T1> = Result0<T1, Error>;

    export type ErrorCode =
        | "FPV.ERR_DIVISION_BY_ZERO"
        | "FPV.ERR_PRECISION_IS_ZERO"
        | "FPV.ERR_PRECISION_IS_NEGATIVE";

    export type Error = Error0<ErrorCode>;

    export type Compatible<T1 extends bigint = 2n> = Fpv<T1> | bigint;
}

export type Fpv<T1 extends bigint = 2n> = 
    & Wrapper<bigint>
    & {

    /**
     * ***Brief***
     * Returns the precision of the `Fpv`.
     * 
     * ***Example***
     * ```ts
     *  Fpv(200n)
     *      .expect("Failed to initialize fixed point value.")
     *      .
     * ```
     */
    precision(): T1;

    /**
     * ***Brief***
     * Returns the representation factor of the `Fpv`, based on its precision.
     * 
     * ***Example***
     * ```ts
     *  Fpv<2n>(200n)
     *      .expect("Failed to initialize ")
     *      .representation(); /// 10**2n
     * ```
     */
    representation(): bigint;

    /**
     * ***Brief***
     * Compares the current `Fpv` with the given value for equality.
     * 
     * ***Example***
     * ```ts
     *  Fpv(200n)
     *      .expect("")
     *      .eq(200n); /// true
     * ```
     */
    eq(value: Fpv.Compatible<T1>): boolean;

    /**
     * ***Brief***
     * Checks if the current `Fpv` is less than the given value.
     */
    lt(value: Fpv.Compatible<T1>): boolean;

    /**
     * ***Brief***
     * Checks if the current `Fpv` is less than or equal to the given value.
     */
    lteq(value: Fpv.Compatible<T1>): boolean;

    /**
     * ***Brief***
     * Checks if the current `Fpv` is greater than the given value.
     * 
     * ***Example***
     * ```ts
     *  let success: boolean = Fpv(200n)
     *      .expect("Failed to initialize fixed point value.")
     *      .gt(200n); /// false
     * ```
     */
    gt(value: Fpv.Compatible<T1>): boolean;

    /**
     * ***Brief***
     * Checks if the current `Fpv` is greater than or equal to the given value,
     * 
     * ***Example***
     * ```ts
     *  let success: boolean = Fpv(200n)
     *      .expect("Failed to initialize Fpv.")
     *      .gteq(200n);
     *  console.log(success); /// "true".
     * ```
     */
    gteq(value: Fpv.Compatible<T1>): boolean;

    /**
     * ***Brief***
     * Adds a given `FpvIsh` value to the current `Fpv`.
     * 
     * ***Warning***
     * Extremely large values may cause the program to panic due to insufficient memory.
     * 
     * ***Example***
     * ```ts
     *  let value: bigint = Fpv(200n)
     *      .expect("Failed to initialize Fpv.")
     *      .add(100n)
     *      .unwrap();
     *  console.log(value); /// 300n === 3.00
     * ```
     */
    add(value: Fpv.Compatible<T1>): Fpv<T1>;
    
    /**
     * ***Brief***
     * Subtracts a given `FpvIsh` value from the current `Fpv`.
     * 
     * ***Warning***
     * Extremely large values may cause the program to panic due to insufficient memory.
     * 
     * ***Example***
     * ```ts
     *  let value: bigint = Fpv(200n)
     *      .expect("Failed to initialize Fpv.")
     *      .sub(100n)
     *      .unwrap();
     *  console.log(value); /// 100n === 1.00
     * ```
     */
    sub(value: Fpv.Compatible<T1>): Fpv<T1>;

    /**
     * ***Brief***
     * Multiplies the current `Fpv` by a given `FpvIsh` value.
     * 
     * ***Warning***
     * Extremely large values may cause the program to panic due to insufficient memory.
     * 
     * ***Example***
     * ```ts
     *  let value: bigint = Fpv(200n)
     *      .expect("Failed to initialize Fpv.")
     *      .mul(50n) /// 0.50
     *      .unwrap();
     *  console.log(value); /// 100n === 1.00
     * ```
     */
    mul(value: Fpv.Compatible<T1>): Fpv<T1>;

    /**
     * ***Brief***
     * Divides the current `Fpv` by a given `FpvIsh` value.
     * 
     * ***Warning***
     * Extremely large values may cause the program to panic due to insufficient memory.
     * 
     * ***Warning***
     * If dividing by zero, an error will be returned.
     * 
     * ***Example***
     * ```ts
     *  let value: bigint = Fpv(200n)
     *      .expect("Failed to initialize Fpv.")
     *      .div(50n) /// 0.50
     *      .unwrap();
     *  console.log(value); /// 400n === 4.00
     * ```
     */
    div(value: Fpv.Compatible<T1>): Fpv.Result<Fpv<T1>>;
};

/**
 * ***Brief***
 * Creates a new `Fpv` with the provided value and precision.
 */
export function Fpv<T1 extends bigint = 2n>(_fpv: Fpv.Compatible<T1>, _precision: T1 = (2n as any)): Fpv.Result<Fpv<T1>> {
    let _value: bigint;
    
    /** @constructor */ {
        if (precision() === 0n) return Err(Error0("FPV.ERR_PRECISION_IS_ZERO", "Fpv: Does not support zero precision."));
        if (precision() < 0n) return Err(Error0("FPV.ERR_PRECISION_IS_NEGATIVE", "Fpv: Does not support negative precision."));
        _value = _unwrap(_fpv);
        return Ok({
            unwrap,
            precision,
            representation,
            eq,
            lt,
            lteq,
            gt,
            gteq,
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

    function eq(value: Fpv.Compatible<T1>): boolean {
        return _value === _unwrap(value);
    }

    function lt(value: Fpv.Compatible<T1>): boolean {
        return _value < _unwrap(value);
    }

    function lteq(value: Fpv.Compatible<T1>): boolean {
        return _value <= _unwrap(value);
    }

    function gt(value: Fpv.Compatible<T1>): boolean {
        return _value > _unwrap(value);
    }

    function gteq(value: Fpv.Compatible<T1>): boolean {
        return _value >= _unwrap(value);
    }

    function add(value: Fpv.Compatible<T1>): Fpv<T1> {
        return _wrap(() => {
            return _value + _unwrap(value);
        });
    }

    function sub(value: Fpv.Compatible<T1>): Fpv<T1> {
        return _wrap(() => {
            return _value - _unwrap(value);
        });
    }

    function mul(value: Fpv.Compatible<T1>): Fpv<T1> {
        return _wrap(() => {
            let z: bigint = _value * _unwrap(value);
            let q: bigint = z / representation();
            return q;
        });
    }

    function div(value: Fpv.Compatible<T1>): Fpv.Result<Fpv<T1>> {
        let n: bigint = _unwrap(value);
        if (n === 0n) return Err(Error0("FPV.ERR_DIVISION_BY_ZERO", "Fpv: Cannot divide by zero."));
        return Ok(_wrap(() => {
            let z: bigint = _value * representation();
            let q: bigint = z / n;
            return q;
        }));
    }

    function _wrap(task: Closure<[], bigint>): Fpv<T1> {
        return Fpv<T1>(task()).expect("Fpv: Failed to wrap the task result into an Fpv." + INTERNAL_ERROR_MESSAGE);
    }

    function _unwrap(fpv: Fpv.Compatible<T1>): bigint {
        if (typeof fpv === "bigint") return fpv;
        return fpv.unwrap();
    }
}
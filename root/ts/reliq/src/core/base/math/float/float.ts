import type { Wrapper } from "@root";
import type { Branded } from "@root";
import type { NumberLike } from "@root";
import type { Polymorph } from "@root";
import type { Span } from "@root";
import { I } from "@root";
import { I8 } from "@root";
import { I16 } from "@root";
import { I32 } from "@root";
import { I64 } from "@root";
import { I128 } from "@root";
import { I256 } from "@root";
import { U } from "@root";
import { U8 } from "@root";
import { U16 } from "@root";
import { U32 } from "@root";
import { U64 } from "@root";
import { U128 } from "@root";
import { U256 } from "@root";

import { MathError } from "@root";
import { Result } from "@root";
import { Ok } from "@root";
import { Err } from "@root";
import { Some } from "@root";
import { None } from "@root";
import { MAX_SAFE_FLOAT } from "@root";
import { MIN_SAFE_FLOAT } from "@root";
import { isBranded } from "@root";

export type Float =
    & Branded<"FLOAT">
    & Wrapper<number>
    & Exclude<Polymorph<unknown>,
        | "toArray">
    & Exclude<Span<unknown>,
        | "at">
    & {
    eq(v: Float): boolean;
    lt(v: Float): boolean;
    gt(v: Float): boolean;
    lteq(v: Float): boolean;
    gteq(v: Float): boolean;
    add(v: Float): Result<Float, MathError<"MATH.ERR_ARITHMETIC_OVERFLOW">>;
    sub(v: Float): Result<Float, MathError<"MATH.ERR_ARITHMETIC_UNDERFLOW">>;
    mul(v: Float): 
        Result<Float, MathError<
            | "MATH.ERR_ARITHMETIC_OVERFLOW"
            | "MATH.ERR_ARITHMETIC_UNDERFLOW">>;
    div(v: Float): 
        Result<Float, MathError<
            | "MATH.ERR_ARITHMETIC_OVERFLOW"
            | "MATH.ERR_ARITHMETIC_UNDERFLOW"
            | "MATH.ERR_DIVISION_BY_ZERO">>;
    pow(v: Float): Result<Float, MathError>;
    mod(v: Float): Result<Float, MathError>;
    sqrt(v: Float): Result<Float, MathError>;
};



/**
 * @notice Accepts a `Float` type.
 * @dev No conversion occurs; if the input is already a `Float`, it is returned unchanged.
 * @param _n The `Float` input value.
 * @return Returns the same `Float` input.
 */
export function Float(_n: Float): Float;

/**
 * @notice Accepts an `I8` type.
 * @dev Converts the `I8` value to a `Float` without any overflow or underflow checks, 
 *      as the range of `I8` is known to be within the acceptable limits for a `Float`.
 * @param _n The `I8` value to convert to a `Float`.
 * @return Returns the `Float` representation of the input value.
 */
export function Float(_n: I8): Float;

/**
 * @notice Accepts an `I16` type.
 * @dev Converts the `I16` value to a `Float` without any overflow or underflow checks, 
 *      as the range of `I16` is known to be within the acceptable limits for a `Float`.
 * @param _n The `I16` value to convert to a `Float`.
 * @return Returns the `Float` representation of the input value.
 */
export function Float(_n: I16): Float;
export function Float(_n: I32): Float;

/**
 * @notice Accepts an `I64` type.
 * @dev Converts the `I64` value to a `Float`, with overflow and underflow checks. 
 *      If the value falls outside the safe `float` range, returns an error.
 * @param _n The `I64` value to convert to a `Float`.
 * @return `Result<Float, MathError>` - returns the `Float` in `Ok` or an error for overflow/underflow.
 */
export function Float(_n: I64): Result<Float, MathError<"MATH.ERR_ARITHMETIC_OVERFLOW" | "MATH.ERR_ARITHMETIC_UNDERFLOW">>;
export function Float(_n: I128): Result<Float, MathError<"MATH.ERR_ARITHMETIC_OVERFLOW" | "MATH.ERR_ARITHMETIC_UNDERFLOW">>;
export function Float(_n: I256): Result<Float, MathError<"MATH.ERR_ARITHMETIC_OVERFLOW" | "MATH.ERR_ARITHMETIC_UNDERFLOW">>;
export function Float(_n: I): Result<Float, MathError<"MATH.ERR_ARITHMETIC_OVERFLOW" | "MATH.ERR_ARITHMETIC_UNDERFLOW">>;
export function Float(_n: U8): Float;
export function Float(_n: U16): Float;
export function Float(_n: U32): Float;

/**
 * @notice Accepts a `U64` type.
 * @dev Converts the `U64` value to a `Float`, checking for overflow. 
 *      Returns an error if it exceeds the acceptable `float` range.
 * @param _n The `U64` value to convert to a `Float`.
 * @return `Result<Float, MathError>` - returns the `Float` in `Ok` or an error for overflow.
 */
export function Float(_n: U64): Result<Float, MathError<"MATH.ERR_ARITHMETIC_OVERFLOW">>;
export function Float(_n: U128): Result<Float, MathError<"MATH.ERR_ARITHMETIC_OVERFLOW">>;
export function Float(_n: U256): Result<Float, MathError<"MATH.ERR_ARITHMETIC_OVERFLOW">>;
export function Float(_n: U): Result<Float, MathError<"MATH.ERR_ARITHMETIC_OVERFLOW">>;
export function Float(_n: number): Result<Float, MathError<"MATH.ERR_ARITHMETIC_OVERFLOW" | "MATH.ERR_ARITHMETIC_UNDERFLOW">>;
export function Float(_n: bigint): Result<Float, MathError<"MATH.ERR_ARITHMETIC_OVERFLOW" | "MATH.ERR_ARITHMETIC_UNDERFLOW">>;
export function Float(_number: NumberLike): Float | Result<Float, MathError<"MATH.ERR_ARITHMETIC_OVERFLOW" | "MATH.ERR_ARITHMETIC_UNDERFLOW">> {
    let _v: number;

    /** @constructor */ {
        if (isBranded(_number, "FLOAT")) {
            let n: number = _number.unwrap();
            if (n > MAX_SAFE_FLOAT) return Err(MathError({ code: "MATH.ERR_ARITHMETIC_OVERFLOW", message: None }));
            if (n < MIN_SAFE_FLOAT) return Err(MathError({ code: "MATH.ERR_ARITHMETIC_UNDERFLOW", message: None }));
            _v = n;
        }
        else if (isBranded(_number, "I")) {
            let n: bigint = _number.unwrap();
            let x: number = Number(n);
            if (x > MAX_SAFE_FLOAT) return Err(MathError({ code: "MATH.ERR_ARITHMETIC_OVERFLOW", message: None }));
            if (x < MIN_SAFE_FLOAT) return Err(MathError({ code: "MATH.ERR_ARITHMETIC_UNDERFLOW", message: None }));
            _v = x;
        }
        else if (isBranded(_number, "U")) {
            let n: bigint = _number.unwrap();
            let x: number = Number(n);
            if (x > MAX_SAFE_FLOAT) return Err()

        } _v = Number(_number.unwrap());
        else if (typeof _number === "number") _v = _number;
        else if (typeof _number === "bigint") _v = Number(_number);
        return Ok({
            type,
            unwrap,
            add,
            sub,
            mul,
            div,
            pow
        });
    }

    function type(): "FLOAT" {
        return "FLOAT";
    }

    function unwrap(): number {
        return _v;
    }

    function toString(): string {
        return _v.toString();
    }

    function toLocaleString(): string {
        return _v.toLocaleString();
    }

    function toExponential(): string;
    function toExponential(digits: bigint): Result<string, RangeError>;
    function toExponential(
        digits?: bigint
    ): 
        | string 
        | Result<string, RangeError> {
        if (digits) {
            if (digits < 0n) return Err(new RangeError());
            if (digits > 20n) return Err(new RangeError());
        }
        return _v.toExponential(digits ? Number(digits) : undefined);
    }

    function eq(v: Float): boolean {
        return _v === v.unwrap();
    }

    function lt(v: Float): boolean {
        return _v === v.unwrap();
    }

    function gt(v: Float): boolean {
        return _v === v.unwrap();
    }

    function add(v: Float): Result<Float, MathError> {
        let x: number = v.unwrap();
        let checkOpR: Result<void, MathError<>> = _check(x);
        if (checkOpR.err()) return checkOpR;
        return Float(_v + x);
    }

    function sub(v: Float): Result<Float, MathError> {
        let x: number = v.unwrap();
        let checkOpR: Result<void, MathError> = _check(x);
        if (checkOpR.err()) return checkOpR;
        return Float(_v - x);
    }

    function mul(v: Float): Result<Float, MathError> {
        let x: number = v.unwrap();
        let checkOpR: Result<void, MathError> = _check(x);
        if (checkOpR.err()) return checkOpR;
        return Float(_v * x);
    }

    function div(v: Float): Result<Float, MathError> {
        let x: number = v.unwrap();
        if (x === 0) return Err(MathError({ code: "MATH.ERR_DIVISION_BY_ZERO", message: "" }));
        let checkOpR: Result<void, MathError> = _check(x);
        if (checkOpR.err()) return checkOpR;
        return Float(_v / x);
    }

    function pow(v: Float): Result<Float, MathError> {
        let x: number = v.unwrap();
        let checkOpR: Result<void, MathError> = _check(x);
        if (checkOpR.err()) return checkOpR;
        return Float(_v ** x);
    }

    function _check(v: number): Result<void, MathError> {
        if (v > MAX_SAFE_FLOAT) return Err(MathError({ code: "MATH.ERR_ARITHMETIC_OVERFLOW", message: "" }));
        if (v < MIN_SAFE_FLOAT) return Err(MathError({ code: "MATH.ERR_ARITHMETIC_UNDERFLOW", message: "" }));
        if (!isFinite(v)) return Err(MathError({ code: "MATH.ERR_NOT_FINITE", message: "" }));
        if (isNaN(v)) return Err(MathError({ code: "MATH.ERR_NOT_A_NUMBER", message: "" }));

        return Ok(undefined);
    }
}
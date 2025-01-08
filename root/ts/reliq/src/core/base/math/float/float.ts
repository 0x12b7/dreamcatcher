import type { Wrapper } from "@root";
import type { Branded } from "@root";
import type { Arithmetic } from "@root";
import type { NumberLike } from "@root";
import { MathError } from "@root";
import { Result } from "@root";
import { Ok } from "@root";
import { Err } from "@root";
import { MAX_SAFE_FLOAT } from "@root";
import { MIN_SAFE_FLOAT } from "@root";
import { isBranded } from "@root";

export type Float =
    & Branded<"FLOAT">
    & Wrapper<number>
    & Arithmetic<number>;

export function Float(_v: number): Result<Float, MathError> {
    /** @constructor */ {
        let checkOpR: Result<void, MathError> = _check(_v);
        if (checkOpR.err()) return checkOpR;
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

    function eq(v: NumberLike): boolean {
        if (isBranded(v, "I")) return _v === Number(v.unwrap());
        if (isBranded(v, "U")) return _v === Number(v.unwrap());
        if (isBranded(v, "FLOAT")) return _v === Number(v.unwrap());
        if (typeof v === "number") return _v === v;
        if (typeof v === "bigint") return _v === Number(v);
        return false;
    }

    function lt(v: NumberLike): boolean {
        if (isBranded(v, "I")) return _v < Number(v.unwrap());
        if (isBranded(v, "U")) return _v < Number(v.unwrap());
        if (isBranded(v, "FLOAT")) return _v < Number(v.unwrap());
        if (typeof v === "number") return _v < v;
        if (typeof v === "bigint") return _v < Number(v);
        return false;
    }

    function gt(v: NumberLike): boolean {
        if (isBranded(v, "I")) return _v > Number(v.unwrap());
        if (isBranded(v, "U")) return _v > Number(v.unwrap());
        if (isBranded(v, "FLOAT")) return _v > Number(v.unwrap());
        if (typeof v === "number") return _v > v;
        if (typeof v === "bigint") return _v > Number(v);
        return false;
    }

    function add(v: Float): Result<Float, MathError> {
        let x: number = v.unwrap();
        let checkOpR: Result<void, MathError> = _check(x);
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
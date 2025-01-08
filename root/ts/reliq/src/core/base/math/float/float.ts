import type { Wrapper } from "@root";
import { MathError } from "@root";
import { Result } from "@root";
import { Ok } from "@root";
import { Err } from "@root";
import { MAX_SAFE_FLOAT } from "@root";
import { MIN_SAFE_FLOAT } from "@root";
import { wrap } from "lodash";

export type Float =
    & Wrapper<number>
    & {
    add(v: Float): Result<Float, MathError>;
    sub(v: Float): Result<Float, MathError>;
    mul(v: Float): Result<Float, MathError>;
    div(v: Float): Result<Float, MathError>;
    pow(v: Float): Result<Float, MathError>;
};

export function Float(_v: number): Result<Float, MathError> {

    /** @constructor */ {
        return Ok({
            unwrap,
            add
        });
    }

    function unwrap(): number {
        return _v;
    }

    function add(v: Float): Result<Float, MathError> {
        let x: number = v.unwrap();
        let checkR: Result<void, MathError> = _check(x);
        if (checkR.err()) return checkR;
        return Float(_v + x);
    }

    function _check(v: number): Result<void, MathError> {
        if (v > MAX_SAFE_FLOAT) return Err(MathError({ code: "MATH.ERR_ARITHMETIC_OVERFLOW", message: "" }));
        if (v < MIN_SAFE_FLOAT) return Err(MathError({ code: "MATH.ERR_ARITHMETIC_UNDERFLOW", message: "" }));
        return Ok(undefined);
    }
}
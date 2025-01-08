import type { Wrapper } from "@root";
import type { WrappedCalculator } from "@root";
import type { NumberLike } from "@root";
import type { Branded } from "@root";
import { Result } from "@root";
import { Ok } from "@root";
import { Err } from "@root";
import { Some } from "@root";
import { None } from "@root";
import { MathError } from "@root";
import { isBranded } from "@root";

export type I = 
    & Branded<"I">
    & Wrapper<bigint>
    & WrappedCalculator<bigint>;

export function I(_number: NumberLike): I {
    let _v: bigint;
    
    /** @constructor */ {
        if (isBranded(_number, "I")) _v = _number.unwrap();
        else if (isBranded(_number, "U")) _v = _number.unwrap();
        else if (isBranded(_number, "FLOAT")) _v = BigInt(_number.unwrap());
        else if (typeof _number === "number") _v = BigInt(_number);
        else _v = _number;
        return {
            type,
            unwrap,
            add,
            sub,
            mul,
            div,
            pow
        };
    }

    function type(): "I" {
        return "I";
    }

    function unwrap(): bigint {
        return _v;
    }

    function add(v: I): Result<I, MathError> {
        let n: bigint = v.unwrap();
        return Ok(I(_v + n));
    }

    function sub(v: I): Result<I, MathError> {
        let n: bigint = v.unwrap();
        return Ok(I(_v - n));
    }

    function mul(v: I): Result<I, MathError> {
        let n: bigint = v.unwrap();
        return Ok(I(_v * n));
    }

    function div(v: I): Result<I, MathError> {
        let n: bigint = v.unwrap();
        if (n === 0n) return Err(MathError({ code: "MATH.ERR_DIVISION_BY_ZERO", message: None }));
        return Ok(I(_v / n));
    }

    function pow(v: I): Result<I, MathError> {
        let n: bigint = v.unwrap();
        return Ok(I(_v ** n));
    }
}


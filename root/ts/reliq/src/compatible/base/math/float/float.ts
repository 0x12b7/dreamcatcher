import type { Wrapper } from "@root";
import type { FloatIsh } from "@root";
import { MAX_SAFE_FLOAT } from "@root";
import { MIN_SAFE_FLOAT } from "@root";
import { MathError } from "@root";
import { Result } from "@root";
import { Ok } from "@root";
import { Err } from "@root";
import { Some } from "@root";
import { unwrapFloatLike } from "@root";


export type Float = 
    & Wrapper<number> 
    & {
    
};

export function Float(_v: FloatIsh): Result<Float, MathError> {
    
    /** @constructor */ {
        if (unwrapFloatLike(_v) > MAX_SAFE_FLOAT) return Err(MathError({ code: "MATH.ERR_ARITHMETIC_OVERFLOW", message: Some(`FLOAT: ${ unwrapFloatLike(_v) } is above the maximum safe float of ${ MAX_SAFE_FLOAT }.`) }));
        if (unwrapFloatLike(_v) < MIN_SAFE_FLOAT) return Err(MathError({ code: "MATH.ERR_ARITHMETIC_UNDERFLOW", message: Some(`FLOAT: ${ unwrapFloatLike(_v) } is below the minumum safe float of ${ MIN_SAFE_FLOAT }.`) }));
        return Ok({ });
    }

    function unwrap(): number {
        return _v;
    }
}

let x: Float = Float()


function walk(x: Float, y: Float) {

}
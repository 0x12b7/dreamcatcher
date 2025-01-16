import {
    type MathErrorCode
} from "@root";

export namespace MathViolation {
    export type UpperArithmeticRange = Extract<MathErrorCode, "MATH.ERR_UPPER_ARITHMETIC_RANGE_VIOLATION">;
    export type LowerArithmeticRange = Extract<MathErrorCode, "MATH.ERR_LOWER_ARITHMETIC_RANGE_VIOLATION">;
    export type UpperRange = Extract<MathErrorCode, "MATH.ERR_UPPER_RANGE_VIOLATION">;   
    export type LowerRange = Extract<MathErrorCode, "MATH.ERR_LOWER_RANGE_VIOLATION">;

}
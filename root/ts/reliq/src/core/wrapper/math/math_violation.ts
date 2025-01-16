import {
    type MathErrorCode
} from "@root";

export namespace MathViolation {
    export type UpperArithmeticRangeViolation = Extract<MathErrorCode, "MATH.ERR_UPPER_ARITHMETIC_RANGE_VIOLATION">;
    export type LowerArithmeticRangeViolation = Extract<MathErrorCode, "MATH.ERR_LOWER_ARITHMETIC_RANGE_VIOLATION">;
    export type UpperRangeViolation = Extract<MathErrorCode, "MATH.ERR_UPPER_RANGE_VIOLATION">;   
    export type LowerRangeViolation = Extract<MathErrorCode, "MATH.ERR_LOWER_RANGE_VIOLATION">;

}
import {
    type MathErrorCode
} from "@root";

export namespace MathViolation {
    export type ArithmeticRange = UpperArithmeticRange | LowerArithmeticRange;
    export type ArithmeticRangeAndPrecision = ArithmeticRange | Precision;
    export type ArithmeticRangeAndDivisionByZero = ArithmeticRange | DivisionByZero;
    export type UpperArithmeticRangeAndPrecision = Extract<MathErrorCode, "MATH.ERR_">;
    export type UpperArithmeticRange = Extract<MathErrorCode, "MATH.ERR_UPPER_ARITHMETIC_RANGE_VIOLATION">;
    export type LowerArithmeticRange = Extract<MathErrorCode, "MATH.ERR_LOWER_ARITHMETIC_RANGE_VIOLATION">;
    export type LowerArithmeticRangeAndPrecision = LowerArithmeticRange | Precision;
    export type UpperRange = Extract<MathErrorCode, "MATH.ERR_UPPER_RANGE_VIOLATION">;   
    export type LowerRange = Extract<MathErrorCode, "MATH.ERR_LOWER_RANGE_VIOLATION">;
    export type Precision = Extract<MathErrorCode, "MATH.ERR_PRECISION_VIOLATION">;
    export type DivisionByZero = Extract<MathErrorCode, "MATH.ERR_DIVISION_BY_ZERO">;
}
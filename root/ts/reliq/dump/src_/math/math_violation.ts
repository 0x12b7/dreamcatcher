namespace MathViolation {
    export type ArithmeticRangeAndPrecision = 
        | "MATH.ERR_UPPER_ARITHMETIC_RANGE_VIOLATION"
        | "MATH.ERR_LOWER_ARITHMETIC_RANGE_VIOLATION"
        | "MATH.ERR_PRECISION_VIOLATION";
    
    export type ArithmeticRangeAndDivisionByZero =
        | "MATH.ERR_UPPER_ARITHMETIC_RANGE_VIOLATION"
        | "MATH.ERR_LOWER_ARITHMETIC_RANGE_VIOLATION"
        | "MATH.ERR_DIVISION_BY_ZERO";

    export type ArithmeticRange =
        | "MATH.ERR_UPPER_ARITHMETIC_RANGE_VIOLATION"
        | "MATH.ERR_LOWER_ARITHMETIC_RANGE_VIOLATION";

    export type UpperArithmeticRange =
        | "MATH.ERR_UPPER_ARITHMETIC_RANGE_VIOLATION";

    export type LowerArithmeticRange =
        | "MATH.ERR_LOWER_ARITHMETIC_RANGE_VIOLATION";

    export type LowerArithmeticRangeAndPrecision =
        | "MATH.ERR_LOWER_ARITHMETIC_RANGE_VIOLATION"
        | "MATH.ERR_PRECISION_VIOLATION";

    export type Range = 
        | "MATH.ERR_UPPER_RANGE_VIOLATION"
        | "MATH.ERR_LOWER_RANGE_VIOLATION";

    export type DivisionByZero =
        | "MATH.ERR_DIVISION_BY_ZERO";

    export type Precision =
        | "MATH.ERR_PRECISION_VIOLATION";
}

export type { MathViolation };
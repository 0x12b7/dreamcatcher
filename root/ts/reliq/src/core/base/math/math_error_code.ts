/**
 * @note Represents possible error codes from mathematical operations:
 * 
 * - **MATH.ERR_PRECISION_LOSS**: A value would be truncated in this operation.
 */
export type MathErrorCode =
    | "MATH.ERR_PRECISION_LOSS"
    | "MATH.ERR_ARITHMETIC_UNDERFLOW"
    | "MATH.ERR_ARITHMETIC_OVERFLOW"
    | "MATH.ERR_NOT_FINITE"
    | "MATH.ERR_NOT_A_NUMBER"
    | "MATH.ERR_NEGATIVE_EXPONENT_ZERO_BASE"
    | "MATH.ERR_FRACTIONAL_EXPONENT_NEGATIVE_BASE"
    | "MATH.ERR_DIVISION_BY_ZERO"
    | "MATH.ERR_OUT_OF_RANGE";
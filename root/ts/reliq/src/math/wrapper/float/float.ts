import type { FloatResult } from "@root";
import type { MathViolation } from "@root";

type Float = {
    eq(value: Float): boolean;
    lt(value: Float): boolean;
    gt(value: Float): boolean;
    lteq(value: Float): boolean;
    gteq(value: Float): boolean;
    add(value: Float): FloatResult<MathViolation.UpperArithmeticRange>;
    sub(value: Float): FloatResult<MathViolation.LowerArithmeticRange>;
    mul(value: Float): FloatResult<MathViolation.ArithmeticRange>;
    div(value: Float): FloatResult<MathViolation.ArithmeticRangeAndDivisionByZero>;
};

export { Float };
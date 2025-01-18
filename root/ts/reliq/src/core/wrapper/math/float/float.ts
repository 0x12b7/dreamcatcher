import {
    type Branded,
    type Numeric,
    type FloatResult,
    type FloatResultMap,
    type MathViolation
} from "@root";

type Float = 
    & Branded<"Float">
    & {
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

function Float<T1 extends Numeric>(_value: T1): FloatResultMap<T1> {
    /** @constructor */ {
        
    }
}

export {
    Float
};
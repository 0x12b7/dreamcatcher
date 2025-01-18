import {
    type Numeric,
    type FloatResult,
    type Float,
    type I8,
    type I16,
    type I32,
    type I64,
    type I128,
    type I256,
    type I,
    type U8,
    type U16,
    type U32,
    type U64,
    type U128,
    type U256,
    type U,
    type MathViolation,
    type Ok
} from "@root";


type MathResultGrid<
    T1 extends
        | Float
        | I8
        | I16
        | I32
        | I64
        | I128
        | I256
        | I
        | U8
        | U16
        | U32
        | U64
        | U128
        | U256
        | U,
    T2 extends Numeric
> =
    T1 extends Float
        ? T2 extends number    ? FloatResult<MathViolation.ArithmeticRange> 
        : T1 extends bigint    ? FloatResult<MathViolation.ArithmeticRange> 
        : T1 extends Float     ? Ok<Float> 
        : T1 extends I8        ? Ok<Float> 
        : T1 extends I16       ? Ok<Float> 
        : T1 extends I32       ? Ok<Float> 
        : T1 extends I64       ? FloatResult<MathViolation.ArithmeticRange> 
        : T1 extends I128      ? FloatResult<MathViolation.ArithmeticRange> 
        : T1 extends I256      ? FloatResult<MathViolation.ArithmeticRange> 
        : T1 extends I         ? FloatResult<MathViolation.ArithmeticRange> 
        : T1 extends U8        ? Ok<Float> 
        : T1 extends U16       ? Ok<Float> 
        : T1 extends U32       ? Ok<Float> 
        : T1 extends U64       ? FloatResult<MathViolation.UpperArithmeticRange> 
        : T1 extends U128      ? FloatResult<MathViolation.UpperArithmeticRange> 
        : T1 extends U256      ? FloatResult<MathViolation.UpperArithmeticRange> 
        : T1 extends U         ? FloatResult<MathViolation.UpperArithmeticRange> 
        : never :
    T1 extends I8   
        ? 
;






import {
    type Numeric,
    type UnsignedInteger,
    type UnsignedIntegerResult,
    type MathViolation,
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
    type Ok
} from "@root";

export type UnsignedIntegerResultMap<T1 extends UnsignedInteger, T2 extends Numeric> =
    T1 extends U8
        ? T2 extends number  ? UnsignedIntegerResult<U8, MathViolation.ArithmeticRangeAndPrecision>
        : T2 extends bigint  ? UnsignedIntegerResult<U8, MathViolation.ArithmeticRange>
        : T2 extends Float   ? UnsignedIntegerResult<U8, MathViolation.ArithmeticRangeAndPrecision>
        : T2 extends I8      ? UnsignedIntegerResult<U8, MathViolation.LowerArithmeticRange>
        : T2 extends I16     ? UnsignedIntegerResult<U8, MathViolation.ArithmeticRange>
        : T2 extends I32     ? UnsignedIntegerResult<U8, MathViolation.ArithmeticRange>
        : T2 extends I64     ? UnsignedIntegerResult<U8, MathViolation.ArithmeticRange>
        : T2 extends I128    ? UnsignedIntegerResult<U8, MathViolation.ArithmeticRange>
        : T2 extends I256    ? UnsignedIntegerResult<U8, MathViolation.ArithmeticRange>
        : T2 extends I       ? UnsignedIntegerResult<U8, MathViolation.ArithmeticRange>
        : T2 extends U8      ? Ok<U8>
        : T2 extends U16     ? UnsignedIntegerResult<U8, MathViolation.UpperArithmeticRange>
        : T2 extends U32     ? UnsignedIntegerResult<U8, MathViolation.UpperArithmeticRange>
        : T2 extends U64     ? UnsignedIntegerResult<U8, MathViolation.UpperArithmeticRange>
        : T2 extends U128    ? UnsignedIntegerResult<U8, MathViolation.UpperArithmeticRange>
        : T2 extends U256    ? UnsignedIntegerResult<U8, MathViolation.UpperArithmeticRange>
        : T2 extends U       ? UnsignedIntegerResult<U8, MathViolation.UpperArithmeticRange>
        : never :
    T1 extends U16
        ? T2 extends number  ? UnsignedIntegerResult<U16, MathViolation.ArithmeticRangeAndPrecision>
        : T2 extends bigint  ? UnsignedIntegerResult<U16, MathViolation.ArithmeticRange>
        : T2 extends Float   ? UnsignedIntegerResult<U16, MathViolation.ArithmeticRangeAndPrecision>
        : T2 extends I8      ? UnsignedIntegerResult<U16, MathViolation.LowerArithmeticRange>
        : T2 extends I16     ? UnsignedIntegerResult<U16, MathViolation.LowerArithmeticRange>
        : T2 extends I32     ? UnsignedIntegerResult<U16, MathViolation.ArithmeticRange>
        : T2 extends I64     ? UnsignedIntegerResult<U16, MathViolation.ArithmeticRange>
        : T2 extends I128    ? UnsignedIntegerResult<U16, MathViolation.ArithmeticRange>
        : T2 extends I256    ? UnsignedIntegerResult<U16, MathViolation.ArithmeticRange>
        : T2 extends I       ? UnsignedIntegerResult<U16, MathViolation.ArithmeticRange>
        : T2 extends U8      ? Ok<I16>
        : T2 extends U16     ? Ok<I16>
        : T2 extends U32     ? UnsignedIntegerResult<U16, MathViolation.UpperArithmeticRange>
        : T2 extends U64     ? UnsignedIntegerResult<U16, MathViolation.UpperArithmeticRange>
        : T2 extends U128    ? UnsignedIntegerResult<U16, MathViolation.UpperArithmeticRange>
        : T2 extends U256    ? UnsignedIntegerResult<U16, MathViolation.UpperArithmeticRange>
        : T2 extends U       ? UnsignedIntegerResult<U16, MathViolation.UpperArithmeticRange>
        : never :
    T1 extends U32
        ? T2 extends number  ? UnsignedIntegerResult<U32, MathViolation.ArithmeticRangeAndPrecision>
        : T2 extends bigint  ? UnsignedIntegerResult<U32, MathViolation.ArithmeticRange>
        : T2 extends Float   ? UnsignedIntegerResult<U32, MathViolation.ArithmeticRangeAndPrecision>
        : T2 extends I8      ? UnsignedIntegerResult<U32, MathViolation.LowerArithmeticRange>
        : T2 extends I16     ? UnsignedIntegerResult<U32, MathViolation.LowerArithmeticRange>
        : T2 extends I32     ? UnsignedIntegerResult<U32, MathViolation.LowerArithmeticRange>
        : T2 extends I64     ? UnsignedIntegerResult<U32, MathViolation.ArithmeticRange>
        : T2 extends I128    ? UnsignedIntegerResult<U32, MathViolation.ArithmeticRange>
        : T2 extends I256    ? UnsignedIntegerResult<U32, MathViolation.ArithmeticRange>
        : T2 extends I       ? UnsignedIntegerResult<U32, MathViolation.ArithmeticRange>
        : T2 extends U8      ? Ok<U32>
        : T2 extends U16     ? Ok<U32>
        : T2 extends U32     ? Ok<U32>
        : T2 extends U64     ? UnsignedIntegerResult<U32, MathViolation.UpperArithmeticRange>
        : T2 extends U128    ? UnsignedIntegerResult<U32, MathViolation.UpperArithmeticRange>
        : T2 extends U256    ? UnsignedIntegerResult<U32, MathViolation.UpperArithmeticRange>
        : T2 extends U       ? UnsignedIntegerResult<U32, MathViolation.UpperArithmeticRange>
        : never:
    T1 extends U64
        ? T2 extends number  ? UnsignedIntegerResult<U64, MathViolation.ArithmeticRangeAndPrecision>
        : T2 extends bigint  ? UnsignedIntegerResult<U64, MathViolation.ArithmeticRange>
        : T2 extends Float   ? UnsignedIntegerResult<U64, MathViolation.LowerArithmeticRangeAndPrecision>
        : T2 extends I8      ? UnsignedIntegerResult<U64, MathViolation.LowerArithmeticRange>
        : T2 extends I16     ? UnsignedIntegerResult<U64, MathViolation.LowerArithmeticRange>
        : T2 extends I32     ? UnsignedIntegerResult<U64, MathViolation.LowerArithmeticRange>
        : T2 extends I64     ? UnsignedIntegerResult<U64, MathViolation.LowerArithmeticRange>
        : T2 extends I128    ? UnsignedIntegerResult<U64, MathViolation.ArithmeticRange>
        : T2 extends I256    ? UnsignedIntegerResult<U64, MathViolation.ArithmeticRange>
        : T2 extends I       ? UnsignedIntegerResult<U64, MathViolation.ArithmeticRange>
        : T2 extends U8      ? Ok<U64>
        : T2 extends U16     ? Ok<U64>
        : T2 extends U32     ? Ok<U64>
        : T2 extends U64     ? Ok<U64>
        : T2 extends U128    ? UnsignedIntegerResult<U64, MathViolation.UpperArithmeticRange>
        : T2 extends U256    ? UnsignedIntegerResult<U64, MathViolation.UpperArithmeticRange>
        : T2 extends U       ? UnsignedIntegerResult<U64, MathViolation.UpperArithmeticRange>
        : never :
    T1 extends U128
        ? T2 extends number  ? UnsignedIntegerResult<U128, MathViolation.ArithmeticRangeAndPrecision>
        : T2 extends bigint  ? UnsignedIntegerResult<U128, MathViolation.ArithmeticRange>
        : T2 extends Float   ? UnsignedIntegerResult<U128, MathViolation.LowerArithmeticRangeAndPrecision>
        : T2 extends I8      ? UnsignedIntegerResult<U128, MathViolation.LowerArithmeticRange>
        : T2 extends I16     ? UnsignedIntegerResult<U128, MathViolation.LowerArithmeticRange>
        : T2 extends I32     ? UnsignedIntegerResult<U128, MathViolation.LowerArithmeticRange>
        : T2 extends I64     ? UnsignedIntegerResult<U128, MathViolation.LowerArithmeticRange>
        : T2 extends I128    ? UnsignedIntegerResult<U128, MathViolation.LowerArithmeticRange>
        : T2 extends I256    ? UnsignedIntegerResult<U128, MathViolation.ArithmeticRange>
        : T2 extends I       ? UnsignedIntegerResult<U128, MathViolation.ArithmeticRange>
        : T2 extends U8      ? Ok<U128>
        : T2 extends U16     ? Ok<U128>
        : T2 extends U32     ? Ok<U128>
        : T2 extends U64     ? Ok<U128>
        : T2 extends U128    ? Ok<U128>
        : T2 extends U256    ? UnsignedIntegerResult<U128, MathViolation.UpperArithmeticRange>
        : T2 extends U       ? UnsignedIntegerResult<U128, MathViolation.UpperArithmeticRange>
        : never :
    T1 extends U256
        ? T2 extends number  ? UnsignedIntegerResult<U256, MathViolation.ArithmeticRangeAndPrecision>
        : T2 extends bigint  ? UnsignedIntegerResult<U256, MathViolation.ArithmeticRange>
        : T2 extends Float   ? UnsignedIntegerResult<U256, MathViolation.UpperArithmeticRangeAndPrecision>
        : T2 extends I8      ? UnsignedIntegerResult<U256, MathViolation.LowerArithmeticRange>
        : T2 extends I16     ? UnsignedIntegerResult<U256, MathViolation.LowerArithmeticRange>
        : T2 extends I32     ? UnsignedIntegerResult<U256, MathViolation.LowerArithmeticRange>
        : T2 extends I64     ? UnsignedIntegerResult<U256, MathViolation.LowerArithmeticRange>
        : T2 extends I128    ? UnsignedIntegerResult<U256, MathViolation.LowerArithmeticRange>
        : T2 extends I256    ? UnsignedIntegerResult<U256, MathViolation.LowerArithmeticRange>
        : T2 extends I       ? UnsignedIntegerResult<U256, MathViolation.ArithmeticRange>
        : T2 extends U8      ? Ok<U256>
        : T2 extends U16     ? Ok<U256>
        : T2 extends U32     ? Ok<U256>
        : T2 extends U64     ? Ok<U256>
        : T2 extends U128    ? Ok<U256>
        : T2 extends U256    ? Ok<U256>
        : T2 extends U       ? UnsignedIntegerResult<U256, MathViolation.UpperArithmeticRange>
        : never :
    T1 extends U
        ? T2 extends number  ? UnsignedIntegerResult<U, MathViolation.Precision>
        : T2 extends bigint  ? UnsignedIntegerResult<U, MathViolation.LowerArithmeticRange>
        : T2 extends Float   ? UnsignedIntegerResult<U, MathViolation.LowerArithmeticRangeAndPrecision>
        : T2 extends I8      ? UnsignedIntegerResult<U, MathViolation.LowerArithmeticRange>
        : T2 extends I16     ? UnsignedIntegerResult<U, MathViolation.LowerArithmeticRange>
        : T2 extends I32     ? UnsignedIntegerResult<U, MathViolation.LowerArithmeticRange>
        : T2 extends I64     ? UnsignedIntegerResult<U, MathViolation.LowerArithmeticRange>
        : T2 extends I128    ? UnsignedIntegerResult<U, MathViolation.LowerArithmeticRange>
        : T2 extends I256    ? UnsignedIntegerResult<U, MathViolation.LowerArithmeticRange>
        : T2 extends I       ? UnsignedIntegerResult<U, MathViolation.LowerArithmeticRange>
        : T2 extends U8      ? Ok<U>
        : T2 extends U16     ? Ok<U>
        : T2 extends U32     ? Ok<U>
        : T2 extends U64     ? Ok<U>
        : T2 extends U128    ? Ok<U>
        : T2 extends U256    ? Ok<U>
        : T2 extends U       ? Ok<U>
        : never :
    never;
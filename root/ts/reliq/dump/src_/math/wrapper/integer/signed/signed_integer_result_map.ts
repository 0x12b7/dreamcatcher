import { 
    type SignedIntegerResult,
    type SignedIntegerLike,
    type Numeric,
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

export type SignedIntegerResultMap<T1 extends SignedIntegerLike, T2 extends Numeric> =
    T1 extends I8
        ? T2 extends number  ? SignedIntegerResult<I8, MathViolation.ArithmeticRangeAndPrecision>
        : T2 extends bigint  ? SignedIntegerResult<I8, MathViolation.ArithmeticRange>
        : T2 extends Float   ? SignedIntegerResult<I8, MathViolation.ArithmeticRangeAndPrecision>
        : T2 extends I8      ? Ok<I8>
        : T2 extends I16     ? SignedIntegerResult<I8, MathViolation.ArithmeticRange>
        : T2 extends I32     ? SignedIntegerResult<I8, MathViolation.ArithmeticRange>
        : T2 extends I64     ? SignedIntegerResult<I8, MathViolation.ArithmeticRange>
        : T2 extends I128    ? SignedIntegerResult<I8, MathViolation.ArithmeticRange>
        : T2 extends I256    ? SignedIntegerResult<I8, MathViolation.ArithmeticRange>
        : T2 extends I       ? SignedIntegerResult<I8, MathViolation.ArithmeticRange>
        : T2 extends U8      ? Ok<I8>
        : T2 extends U16     ? SignedIntegerResult<I8, MathViolation.UpperArithmeticRange>
        : T2 extends U32     ? SignedIntegerResult<I8, MathViolation.UpperArithmeticRange>
        : T2 extends U64     ? SignedIntegerResult<I8, MathViolation.UpperArithmeticRange>
        : T2 extends U128    ? SignedIntegerResult<I8, MathViolation.UpperArithmeticRange>
        : T2 extends U256    ? SignedIntegerResult<I8, MathViolation.UpperArithmeticRange>
        : T2 extends U       ? SignedIntegerResult<I8, MathViolation.UpperArithmeticRange>
        : never :
    T1 extends I16
        ? T2 extends number  ? SignedIntegerResult<I16, MathViolation.ArithmeticRangeAndPrecision>
        : T2 extends bigint  ? SignedIntegerResult<I16, MathViolation.ArithmeticRange>
        : T2 extends Float   ? SignedIntegerResult<I16, MathViolation.ArithmeticRangeAndPrecision>
        : T2 extends I8      ? Ok<I16>
        : T2 extends I16     ? Ok<I16>
        : T2 extends I32     ? SignedIntegerResult<I16, MathViolation.ArithmeticRange>
        : T2 extends I64     ? SignedIntegerResult<I16, MathViolation.ArithmeticRange>
        : T2 extends I128    ? SignedIntegerResult<I16, MathViolation.ArithmeticRange>
        : T2 extends I256    ? SignedIntegerResult<I16, MathViolation.ArithmeticRange>
        : T2 extends I       ? SignedIntegerResult<I16, MathViolation.ArithmeticRange>
        : T2 extends U8      ? Ok<I16>
        : T2 extends U16     ? Ok<I16>
        : T2 extends U32     ? SignedIntegerResult<I16, MathViolation.UpperArithmeticRange>
        : T2 extends U64     ? SignedIntegerResult<I16, MathViolation.UpperArithmeticRange>
        : T2 extends U128    ? SignedIntegerResult<I16, MathViolation.UpperArithmeticRange>
        : T2 extends U256    ? SignedIntegerResult<I16, MathViolation.UpperArithmeticRange>
        : T2 extends U       ? SignedIntegerResult<I16, MathViolation.UpperArithmeticRange>
        : never :
    T1 extends I32
        ? T2 extends number  ? SignedIntegerResult<I32, MathViolation.ArithmeticRangeAndPrecision>
        : T2 extends bigint  ? SignedIntegerResult<I32, MathViolation.ArithmeticRange>
        : T2 extends Float   ? SignedIntegerResult<I32, MathViolation.ArithmeticRangeAndPrecision>
        : T2 extends I8      ? Ok<I32>
        : T2 extends I16     ? Ok<I32>
        : T2 extends I32     ? Ok<I32>
        : T2 extends I64     ? SignedIntegerResult<I32, MathViolation.ArithmeticRange>
        : T2 extends I128    ? SignedIntegerResult<I32, MathViolation.ArithmeticRange>
        : T2 extends I256    ? SignedIntegerResult<I32, MathViolation.ArithmeticRange>
        : T2 extends I       ? SignedIntegerResult<I32, MathViolation.ArithmeticRange>
        : T2 extends U8      ? Ok<I32>
        : T2 extends U16     ? Ok<I32>
        : T2 extends U32     ? Ok<I32>
        : T2 extends U64     ? SignedIntegerResult<I32, MathViolation.UpperArithmeticRange>
        : T2 extends U128    ? SignedIntegerResult<I32, MathViolation.UpperArithmeticRange>
        : T2 extends U256    ? SignedIntegerResult<I32, MathViolation.UpperArithmeticRange>
        : T2 extends U       ? SignedIntegerResult<I32, MathViolation.UpperArithmeticRange>
        : never :
    T1 extends I64
        ? T2 extends number  ? SignedIntegerResult<I64, MathViolation.ArithmeticRangeAndPrecision>
        : T2 extends bigint  ? SignedIntegerResult<I64, MathViolation.ArithmeticRange>
        : T2 extends Float   ? SignedIntegerResult<I64, MathViolation.Precision>
        : T2 extends I8      ? Ok<I64>
        : T2 extends I16     ? Ok<I64>
        : T2 extends I32     ? Ok<I64>
        : T2 extends I64     ? Ok<I64>
        : T2 extends I128    ? SignedIntegerResult<I64, MathViolation.ArithmeticRange>
        : T2 extends I256    ? SignedIntegerResult<I64, MathViolation.ArithmeticRange>
        : T2 extends I       ? SignedIntegerResult<I64, MathViolation.ArithmeticRange>
        : T2 extends U8      ? Ok<I64>
        : T2 extends U16     ? Ok<I64>
        : T2 extends U32     ? Ok<I64>
        : T2 extends U64     ? Ok<I64>
        : T2 extends U128    ? SignedIntegerResult<I64, MathViolation.UpperArithmeticRange>
        : T2 extends U256    ? SignedIntegerResult<I64, MathViolation.UpperArithmeticRange>
        : T2 extends U       ? SignedIntegerResult<I64, MathViolation.UpperArithmeticRange>
        : never :
    T1 extends I128
        ? T2 extends number  ? SignedIntegerResult<I128, MathViolation.ArithmeticRangeAndPrecision>
        : T2 extends bigint  ? SignedIntegerResult<I128, MathViolation.ArithmeticRange>
        : T2 extends Float   ? SignedIntegerResult<I128, MathViolation.Precision>
        : T2 extends I8      ? Ok<I128>
        : T2 extends I16     ? Ok<I128>
        : T2 extends I32     ? Ok<I128>
        : T2 extends I64     ? Ok<I128>
        : T2 extends I128    ? Ok<I128>
        : T2 extends I256    ? SignedIntegerResult<I128, MathViolation.ArithmeticRange>
        : T2 extends I       ? SignedIntegerResult<I128, MathViolation.ArithmeticRange>
        : T2 extends U8      ? Ok<I128>
        : T2 extends U16     ? Ok<I128>
        : T2 extends U32     ? Ok<I128>
        : T2 extends U64     ? Ok<I128>
        : T2 extends U128    ? Ok<I128>
        : T2 extends U256    ? SignedIntegerResult<I128, MathViolation.UpperArithmeticRange>
        : T2 extends U       ? SignedIntegerResult<I128, MathViolation.UpperArithmeticRange>
        : never :
    T1 extends I256
        ? T2 extends number  ? SignedIntegerResult<I256, MathViolation.ArithmeticRangeAndPrecision>
        : T2 extends bigint  ? SignedIntegerResult<I256, MathViolation.ArithmeticRange>
        : T2 extends Float   ? SignedIntegerResult<I256, MathViolation.Precision>
        : T2 extends I8      ? Ok<I256>
        : T2 extends I16     ? Ok<I256>
        : T2 extends I32     ? Ok<I256>
        : T2 extends I64     ? Ok<I256>
        : T2 extends I128    ? Ok<I256>
        : T2 extends I256    ? Ok<I256>
        : T2 extends I       ? SignedIntegerResult<I256, MathViolation.ArithmeticRange>
        : T2 extends U8      ? Ok<I256>
        : T2 extends U16     ? Ok<I256>
        : T2 extends U32     ? Ok<I256>
        : T2 extends U64     ? Ok<I256>
        : T2 extends U128    ? Ok<I256>
        : T2 extends U256    ? Ok<I256>
        : T2 extends U       ? SignedIntegerResult<I256, MathViolation.UpperArithmeticRange>
        : never :
    T1 extends I
        ? T2 extends number  ? SignedIntegerResult<I, MathViolation.Precision>
        : T2 extends bigint  ? Ok<I>
        : T2 extends Float   ? SignedIntegerResult<I, MathViolation.Precision>
        : T2 extends I8      ? Ok<I>
        : T2 extends I16     ? Ok<I>
        : T2 extends I32     ? Ok<I>
        : T2 extends I64     ? Ok<I>
        : T2 extends I128    ? Ok<I>
        : T2 extends I256    ? Ok<I>
        : T2 extends I       ? Ok<I>
        : T2 extends U8      ? Ok<I>
        : T2 extends U16     ? Ok<I>
        : T2 extends U32     ? Ok<I>
        : T2 extends U64     ? Ok<I>
        : T2 extends U128    ? Ok<I>
        : T2 extends U256    ? Ok<I>
        : T2 extends U       ? Ok<I>
        : never :
    never;
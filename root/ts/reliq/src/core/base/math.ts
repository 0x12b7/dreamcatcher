import { type Branded } from "@root";
import { type Wrapper } from "@root";
import { Result } from "@root";
import { Option } from "@root";

export const MAX_256: bigint = 2n**256n - 1n;
export const MIN_256: bigint = - MAX_256;
export const MAX_128: bigint = 2n**128n - 1n;
export const MIN_128: bigint = - MAX_128;
export const MAX_64: bigint = 2n**64n - 1n;
export const MIN_64: bigint = - MAX_64;
export const MAX_32: bigint = 2n**32n - 1n;
export const MIN_32: bigint = - MAX_32;
export const MAX_16: bigint = 2n**16n - 1n;
export const MIN_16: bigint = - MAX_16;
export const MAX_8: bigint = 2n**8n - 1n;
export const MIN_8: bigint = - MAX_8;
export const MAX_I256: I256 = I256(MAX_256).expect("Invalid I256 constant.");
export const MIN_I256: I256 = I256(MIN_256).expect("Invalid I256 constant.");
export const MAX_I128: I128 = I128(MAX_128).expect("Invalid I128 constant.");
export const MIN_I128: I128 = I128(MIN_128).expect("Invalid I128 constant.");
export const MAX_I64: I64 = I64(MAX_64).expect("Invalid I64 constant.");
export const MIN_I64: I64 = I64(MIN_64).expect("Invalid I64 constant.");
export const MAX_I32: I32 = I32(MAX_32).expect("Invalid I32 constant.");
export const MIN_I32: I32 = I32(MIN_32).expect("Invalid I32 constant.");
export const MAX_I16: I16 = I16(MAX_16).expect("Invalid I16 constant.");
export const MIN_I16: I16 = I16(MIN_16).expect("Invalid I16 constant.");
export const MAX_I8: I8 = I8(MAX_8).expect("Invalid I8 constant.");
export const MIN_I8: I8 = I8(MIN_8).expect("Invalid I8 constant.");
export const MAX_U256: U256 = U256(MAX_256).expect("Invalid U256 constant.");
export const MIN_U256: U256 = U256(0).expect("Invalid U256 constant.");
export const MAX_U128: U128 = U128(MAX_128).expect("Invalid U128 constant.");
export const MIN_U128: U128 = U128(0).expect("Invalid U128 constant.");
export const MAX_U64: U64 = U64(MAX_64).expect("Invalid U64 constant.");
export const MIN_U64: U64 = U64(0).expect("Invalid U64 constant.");
export const MAX_U32: U32 = U32(MAX_32).expect("Invalid U32 constant.");
export const MIN_U32: U32 = U32(0).expect("Invalid U32 constant.");
export const MAX_U16: U16 = U16(MAX_16).expect("Invalid U16 constant.");
export const MIN_U16: U16 = U16(0).expect("Invalid U16 constant.");
export const MAX_U8: U8 = U8(MAX_8).expect("Invalid U8 constant.");
export const MIN_U8: U8 = U8(0).expect("Invalid U8 constant.");
export const MAX_NUMBER: number  = Number.MAX_SAFE_INTEGER;
export const MIN_NUMBER: number  = Number.MIN_SAFE_INTEGER;
export const MAX_FLOAT: Float = Float(MAX_NUMBER).expect("Invalid Float constant.");
export const MIN_FLOAT: Float = Float(MIN_NUMBER).expect("Invalid Float constant.")

export type MathR<T1 extends MathErrorCode = MathErrorCode> = Result<NumberLike, MathError<T1>>;

export type MathContextLike = MathRangeViolationContext | MathPrecisionViolationContext;

export type MathRangeViolationContext = [lower: bigint, upper: bigint, actual: bigint];

export type MathPrecisionViolationContext = {};

export type MathErrorCode = 
    | "MATH.ERR_UPPER_ARITHMETIC_RANGE_VIOLATION"
    | "MATH.ERR_LOWER_ARITHMETIC_RANGE_VIOLATION"
    | "MATH.ERR_UPPER_RANGE_VIOLATION"
    | "MATH.ERR_LOWER_RANGE_VIOLATION"
    | "MATH.ERR_PRECISION_VIOLATION"
    | "MATH.ERR_DIVISION_BY_ZERO";

export type MathError<T1 extends MathErrorCode> = {
    code: T1;
    message: Option<string>;
    context: Option<MathContextLike>
    result: Option<NumberLike>;
};

export function MathError<T1 extends MathErrorCode>(_this: MathError<T1>): MathError<T1> {
    /** @constructor */ {
        return _this;
    }
}

export type _ArithmeticRangeAndPrecisionViolation = "MATH.ERR_UPPER_ARITHMETIC_RANGE_VIOLATION" | "MATH.ERR_LOWER_ARITHMETIC_RANGE_VIOLATION" | "MATH.ERR_PRECISION_VIOLATION";
export type _ArithmeticRangeViolationAndDivisionByZero = "MATH.ERR_UPPER_ARITHMETIC_RANGE_VIOLATION" | "MATH.ERR_LOWER_ARITHMETIC_RANGE_VIOLATION" | "MATH.ERR_DIVISION_BY_ZERO";
export type _ArithmeticRangeViolation = "MATH.ERR_UPPER_ARITHMETIC_RANGE_VIOLATION" | "MATH.ERR_LOWER_ARITHMETIC_RANGE_VIOLATION"; 
export type _UpperArithmeticRangeViolation = "MATH.ERR_UPPER_ARITHMETIC_RANGE_VIOLATION";
export type _DivisionByZero = "MATH.ERR_DIVISION_BY_ZERO";
export type _LowerArithmeticRangeViolation = "MATH.ERR_LOWER_ARITHMETIC_RANGE_VIOLATION";
export type _LowerArithmeticRangeAndPrecisionViolation = "MATH.ERR_LOWER_ARITHMETIC_RANGE_VIOLATION" | "MATH.ERR_PRECISION_VIOLATION";
export type _PrecisionViolation = "MATH.ERR_PRECISION_VIOLATION";


export type NumberLike = Float | number | bigint | I8 | I16 | I32 | I64 | I128 | I256 | I | U8 | U16 | U32 | U64 | U128 | U256 | U;

export type FloatResult<T1 extends MathErrorCode = MathErrorCode> = Result<Float, MathError<T1>>;

export type FloatResultMap<T1 extends NumberLike> =
    T1 extends number    ? FloatResult<_ArithmeticRangeViolation> :
    T1 extends bigint    ? FloatResult<_ArithmeticRangeViolation> :
    T1 extends Float     ? Float :
    T1 extends I8        ? Float :
    T1 extends I16       ? Float :
    T1 extends I32       ? Float :
    T1 extends I64       ? FloatResult<_ArithmeticRangeViolation> :
    T1 extends I128      ? FloatResult<_ArithmeticRangeViolation> :
    T1 extends I256      ? FloatResult<_ArithmeticRangeViolation> :
    T1 extends I         ? FloatResult<_ArithmeticRangeViolation> :
    T1 extends U8        ? Float :
    T1 extends U16       ? Float :
    T1 extends U32       ? Float :
    T1 extends U64       ? FloatResult<_UpperArithmeticRangeViolation> :
    T1 extends U128      ? FloatResult<_UpperArithmeticRangeViolation> :
    T1 extends U256      ? FloatResult<_UpperArithmeticRangeViolation> :
    T1 extends U         ? FloatResult<_UpperArithmeticRangeViolation> :
    never;

export type Float = 
    & Branded<"FLOAT">
    & Wrapper<number>
    & {
    eq(x: Float): boolean;
    lt(x: Float): boolean;
    gt(x: Float): boolean;
    lteq(x: Float): boolean;
    gteq(x: Float): boolean;
    add(x: Float): FloatResult<_UpperArithmeticRangeViolation>;
    sub(x: Float): FloatResult<_LowerArithmeticRangeViolation>;
    mul(x: Float): FloatResult<_ArithmeticRangeViolation>;
    div(x: Float): FloatResult<_ArithmeticRangeViolationAndDivisionByZero>;
};

export function Float<T1 extends NumberLike>(_x: T1): FloatResultMap<T1> {
    /** @constructor */ {

    }
}


export type SignedIntegerResult<T1 extends SignedInteger<T3>, T2 extends MathErrorCode, T3 extends SignedIntegerBrand = SignedIntegerBrandMap<T1>> = Result<T1, MathError<T2>>;

export type SignedIntegerResultMap<T1 extends SignedInteger<T3>, T2 extends NumberLike, T3 extends SignedIntegerBrand = SignedIntegerBrandMap<T1>> =
    T1 extends I8
        ? T2 extends number  ? SignedIntegerResult<I8, _ArithmeticRangeAndPrecisionViolation>
        : T2 extends bigint  ? SignedIntegerResult<I8, _ArithmeticRangeViolation>
        : T2 extends Float   ? SignedIntegerResult<I8, _ArithmeticRangeAndPrecisionViolation>
        : T2 extends I8      ? I8
        : T2 extends I16     ? SignedIntegerResult<I8, _ArithmeticRangeViolation>
        : T2 extends I32     ? SignedIntegerResult<I8, _ArithmeticRangeViolation>
        : T2 extends I64     ? SignedIntegerResult<I8, _ArithmeticRangeViolation>
        : T2 extends I128    ? SignedIntegerResult<I8, _ArithmeticRangeViolation>
        : T2 extends I256    ? SignedIntegerResult<I8, _ArithmeticRangeViolation>
        : T2 extends I       ? SignedIntegerResult<I8, _ArithmeticRangeViolation>
        : T2 extends U8      ? I8
        : T2 extends U16     ? SignedIntegerResult<I8, _UpperArithmeticRangeViolation>
        : T2 extends U32     ? SignedIntegerResult<I8, _UpperArithmeticRangeViolation>
        : T2 extends U64     ? SignedIntegerResult<I8, _UpperArithmeticRangeViolation>
        : T2 extends U128    ? SignedIntegerResult<I8, _UpperArithmeticRangeViolation>
        : T2 extends U256    ? SignedIntegerResult<I8, _UpperArithmeticRangeViolation>
        : T2 extends U       ? SignedIntegerResult<I8, _UpperArithmeticRangeViolation>
        : never :
    T1 extends I16
        ? T2 extends number  ? SignedIntegerResult<I16, _ArithmeticRangeAndPrecisionViolation>
        : T2 extends bigint  ? SignedIntegerResult<I16, _ArithmeticRangeViolation>
        : T2 extends Float   ? SignedIntegerResult<I16, _ArithmeticRangeAndPrecisionViolation>
        : T2 extends I8      ? I16
        : T2 extends I16     ? I16
        : T2 extends I32     ? SignedIntegerResult<I16, _ArithmeticRangeViolation>
        : T2 extends I64     ? SignedIntegerResult<I16, _ArithmeticRangeViolation>
        : T2 extends I128    ? SignedIntegerResult<I16, _ArithmeticRangeViolation>
        : T2 extends I256    ? SignedIntegerResult<I16, _ArithmeticRangeViolation>
        : T2 extends I       ? SignedIntegerResult<I16, _ArithmeticRangeViolation>
        : T2 extends U8      ? I16
        : T2 extends U16     ? I16
        : T2 extends U32     ? SignedIntegerResult<I16, _UpperArithmeticRangeViolation>
        : T2 extends U64     ? SignedIntegerResult<I16, _UpperArithmeticRangeViolation>
        : T2 extends U128    ? SignedIntegerResult<I16, _UpperArithmeticRangeViolation>
        : T2 extends U256    ? SignedIntegerResult<I16, _UpperArithmeticRangeViolation>
        : T2 extends U       ? SignedIntegerResult<I16, _UpperArithmeticRangeViolation>
        : never :
    T1 extends I32
        ? T2 extends number  ? SignedIntegerResult<I32, _ArithmeticRangeAndPrecisionViolation>
        : T2 extends bigint  ? SignedIntegerResult<I32, _ArithmeticRangeViolation>
        : T2 extends Float   ? SignedIntegerResult<I32, _ArithmeticRangeAndPrecisionViolation>
        : T2 extends I8      ? I32
        : T2 extends I16     ? I32
        : T2 extends I32     ? I32
        : T2 extends I64     ? SignedIntegerResult<I32, _ArithmeticRangeViolation>
        : T2 extends I128    ? SignedIntegerResult<I32, _ArithmeticRangeViolation>
        : T2 extends I256    ? SignedIntegerResult<I32, _ArithmeticRangeViolation>
        : T2 extends I       ? SignedIntegerResult<I32, _ArithmeticRangeViolation>
        : T2 extends U8      ? I32
        : T2 extends U16     ? I32
        : T2 extends U32     ? I32
        : T2 extends U64     ? SignedIntegerResult<I32, _UpperArithmeticRangeViolation>
        : T2 extends U128    ? SignedIntegerResult<I32, _UpperArithmeticRangeViolation>
        : T2 extends U256    ? SignedIntegerResult<I32, _UpperArithmeticRangeViolation>
        : T2 extends U       ? SignedIntegerResult<I32, _UpperArithmeticRangeViolation>
        : never :
    T1 extends I64
        ? T2 extends number  ? SignedIntegerResult<I64, _ArithmeticRangeAndPrecisionViolation>
        : T2 extends bigint  ? SignedIntegerResult<I64, _ArithmeticRangeViolation>
        : T2 extends Float   ? SignedIntegerResult<I64, _PrecisionViolation>
        : T2 extends I8      ? I64
        : T2 extends I16     ? I64
        : T2 extends I32     ? I64
        : T2 extends I64     ? I64
        : T2 extends I128    ? SignedIntegerResult<I64, _ArithmeticRangeViolation>
        : T2 extends I256    ? SignedIntegerResult<I64, _ArithmeticRangeViolation>
        : T2 extends I       ? SignedIntegerResult<I64, _ArithmeticRangeViolation>
        : T2 extends U8      ? I64
        : T2 extends U16     ? I64
        : T2 extends U32     ? I64 
        : T2 extends U64     ? I64
        : T2 extends U128    ? SignedIntegerResult<I64, _ArithmeticRangeViolation>
        : T2 extends U256    ? SignedIntegerResult<I64, _ArithmeticRangeViolation>
        : T2 extends U       ? SignedIntegerResult<I64, _ArithmeticRangeViolation>
        : never :
    T1 extends I128
        ? T2 extends number  ? SignedIntegerResult<I128, _PrecisionViolation>
        : T2 extends bigint  ? SignedIntegerResult<I128, _ArithmeticRangeViolation>
        : T2 extends Float   ? SignedIntegerResult<I128, _PrecisionViolation>
        : T2 extends I8      ? I128
        : T2 extends I16     ? I128
        : T2 extends I32     ? I128
        : T2 extends I64     ? I128
        : T2 extends I128    ? I128
        : T2 extends I256    ? SignedIntegerResult<I128, _ArithmeticRangeViolation>
        : T2 extends I       ? SignedIntegerResult<I128, _ArithmeticRangeViolation>
        : T2 extends U8      ? I128
        : T2 extends U16     ? I128
        : T2 extends U32     ? I128
        : T2 extends U64     ? I128
        : T2 extends U128    ? I128
        : T2 extends U256    ? SignedIntegerResult<I128, _UpperArithmeticRangeViolation>
        : T2 extends U       ? SignedIntegerResult<I128, _UpperArithmeticRangeViolation>
        : never :
    T1 extends I256
        ? T2 extends number  ? SignedIntegerResult<I256, _PrecisionViolation>
        : T2 extends bigint  ? SignedIntegerResult<I256, _ArithmeticRangeViolation>
        : T2 extends Float   ? SignedIntegerResult<I256, _PrecisionViolation>
        : T2 extends I8      ? I256
        : T2 extends I16     ? I256
        : T2 extends I32     ? I256
        : T2 extends I64     ? I256
        : T2 extends I128    ? I256
        : T2 extends I256    ? I256
        : T2 extends I       ? SignedIntegerResult<I256, _ArithmeticRangeViolation>
        : T2 extends U8      ? I256
        : T2 extends U16     ? I256
        : T2 extends U32     ? I256
        : T2 extends U64     ? I256
        : T2 extends U128    ? I256
        : T2 extends U256    ? I256
        : T2 extends U       ? SignedIntegerResult<I256, _ArithmeticRangeViolation>
        : never :
    T1 extends I
        ? T2 extends number  ? SignedIntegerResult<I, _PrecisionViolation>
        : T2 extends bigint  ? I
        : T2 extends Float   ? SignedIntegerResult<I, _PrecisionViolation>
        : T2 extends I8      ? I
        : T2 extends I16     ? I
        : T2 extends I32     ? I
        : T2 extends I64     ? I
        : T2 extends I128    ? I
        : T2 extends I256    ? I
        : T2 extends I       ? I
        : T2 extends U8      ? I
        : T2 extends U16     ? I
        : T2 extends U32     ? I
        : T2 extends U64     ? I
        : T2 extends U128    ? I
        : T2 extends U256    ? I
        : T2 extends U       ? I
        : never :
    never;

export type LargestSignedIntegerResult<T1 extends SignedInteger<any>, T2 extends SignedInteger<any>, T3 extends MathErrorCode> = Result<LargestSignedInteger<T1, T2>, MathError<T3>>;

export type LargestSignedInteger<T1 extends SignedInteger<T3>, T2 extends SignedInteger<T4>, T3 extends SignedIntegerBrand = SignedIntegerBrandMap<T1>, T4 extends SignedIntegerBrand = SignedIntegerBrandMap<T2>> =
    T1 extends T2    ? T1 :
    T1 extends I     ? T1 :
    T2 extends I     ? T2 :
    T1 extends I256  ? T1 :
    T2 extends I256  ? T2 :
    T1 extends I128  ? T1 :
    T2 extends I128  ? T2 :
    T1 extends I64   ? T1 :
    T2 extends I64   ? T2 :
    T1 extends I32   ? T1 :
    T2 extends I32   ? T2 :
    T1 extends I16   ? T1 :
    T2 extends I16   ? T2 :
    T1 extends I8    ? T1 :
    T1 extends I8    ? T2 :
    never;

export type SignedIntegerBrandMap<T1 extends SignedInteger<SignedIntegerBrand>> = 
    T1 extends I8    ? "I8" :
    T1 extends I16   ? "I16" :
    T1 extends I32   ? "I32" :
    T1 extends I64   ? "I64" :
    T1 extends I128  ? "I128" :
    T1 extends I256  ? "I256" :
    T1 extends I     ? "I" :
    never;

export type SignedIntegerBrand = "I8" | "I16" | "I32" | "I64" | "I128" | "I256" | "I";

export type SignedInteger<T1 extends SignedIntegerBrand> = 
    & Branded<T1> 
    & Wrapper<bigint>
    & {
};


export type I8 = 
    & SignedInteger<"I8">
    & {
    eq<T1 extends SignedInteger<T2>, T2 extends SignedIntegerBrand = SignedIntegerBrandMap<T1>>(x: T1): boolean;
    lt<T1 extends SignedInteger<T2>, T2 extends SignedIntegerBrand = SignedIntegerBrandMap<T1>>(x: T1): boolean;
    gt<T1 extends SignedInteger<T2>, T2 extends SignedIntegerBrand = SignedIntegerBrandMap<T1>>(x: T1): boolean;
    lteq<T1 extends SignedInteger<T2>, T2 extends SignedIntegerBrand = SignedIntegerBrandMap<T1>>(x: T1): boolean;
    gteq<T1 extends SignedInteger<T2>, T2 extends SignedIntegerBrand = SignedIntegerBrandMap<T1>>(x: T1): boolean;
    add<T1 extends SignedInteger<T2>, T2 extends SignedIntegerBrand = SignedIntegerBrandMap<T1>>(x: T1): LargestSignedIntegerResult<I8, T1, _UpperArithmeticRangeViolation>;
    sub<T1 extends SignedInteger<T2>, T2 extends SignedIntegerBrand = SignedIntegerBrandMap<T1>>(x: T1): LargestSignedIntegerResult<I8, T1, _LowerArithmeticRangeViolation>;
    mul<T1 extends SignedInteger<T2>, T2 extends SignedIntegerBrand = SignedIntegerBrandMap<T1>>(x: T1): LargestSignedIntegerResult<I8, T1, _ArithmeticRangeViolation>;
    div<T1 extends SignedInteger<T2>, T2 extends SignedIntegerBrand = SignedIntegerBrandMap<T1>>(x: T1): LargestSignedIntegerResult<I8, T1, _ArithmeticRangeViolationAndDivisionByZero>;
};

export type I16 = 
    & SignedInteger<"I16">
    & {
    eq<T1 extends SignedInteger<T2>, T2 extends SignedIntegerBrand = SignedIntegerBrandMap<T1>>(x: T1): boolean;
    lt<T1 extends SignedInteger<T2>, T2 extends SignedIntegerBrand = SignedIntegerBrandMap<T1>>(x: T1): boolean;
    gt<T1 extends SignedInteger<T2>, T2 extends SignedIntegerBrand = SignedIntegerBrandMap<T1>>(x: T1): boolean;
    lteq<T1 extends SignedInteger<T2>, T2 extends SignedIntegerBrand = SignedIntegerBrandMap<T1>>(x: T1): boolean;
    gteq<T1 extends SignedInteger<T2>, T2 extends SignedIntegerBrand = SignedIntegerBrandMap<T1>>(x: T1): boolean;
    add<T1 extends SignedInteger<T2>, T2 extends SignedIntegerBrand = SignedIntegerBrandMap<T1>>(x: T1): LargestSignedIntegerResult<I16, T1, _UpperArithmeticRangeViolation>;
    sub<T1 extends SignedInteger<T2>, T2 extends SignedIntegerBrand = SignedIntegerBrandMap<T1>>(x: T1): LargestSignedIntegerResult<I16, T1, _LowerArithmeticRangeViolation>;
    mul<T1 extends SignedInteger<T2>, T2 extends SignedIntegerBrand = SignedIntegerBrandMap<T1>>(x: T1): LargestSignedIntegerResult<I16, T1, _ArithmeticRangeViolation>;
    div<T1 extends SignedInteger<T2>, T2 extends SignedIntegerBrand = SignedIntegerBrandMap<T1>>(x: T1): LargestSignedIntegerResult<I16, T1, _ArithmeticRangeViolationAndDivisionByZero>;
};

export type I32 =
    & SignedInteger<"I32">
    & {
    eq<T1 extends SignedInteger<T2>, T2 extends SignedIntegerBrand = SignedIntegerBrandMap<T1>>(x: T1): boolean;
    lt<T1 extends SignedInteger<T2>, T2 extends SignedIntegerBrand = SignedIntegerBrandMap<T1>>(x: T1): boolean;
    gt<T1 extends SignedInteger<T2>, T2 extends SignedIntegerBrand = SignedIntegerBrandMap<T1>>(x: T1): boolean;
    lteq<T1 extends SignedInteger<T2>, T2 extends SignedIntegerBrand = SignedIntegerBrandMap<T1>>(x: T1): boolean;
    gteq<T1 extends SignedInteger<T2>, T2 extends SignedIntegerBrand = SignedIntegerBrandMap<T1>>(x: T1): boolean;
    add<T1 extends SignedInteger<T2>, T2 extends SignedIntegerBrand = SignedIntegerBrandMap<T1>>(x: T1): LargestSignedIntegerResult<I32, T1, _UpperArithmeticRangeViolation>;
    sub<T1 extends SignedInteger<T2>, T2 extends SignedIntegerBrand = SignedIntegerBrandMap<T1>>(x: T1): LargestSignedIntegerResult<I32, T1, _LowerArithmeticRangeViolation>;
    mul<T1 extends SignedInteger<T2>, T2 extends SignedIntegerBrand = SignedIntegerBrandMap<T1>>(x: T1): LargestSignedIntegerResult<I32, T1, _ArithmeticRangeViolation>;
    div<T1 extends SignedInteger<T2>, T2 extends SignedIntegerBrand = SignedIntegerBrandMap<T1>>(x: T1): LargestSignedIntegerResult<I32, T1, _ArithmeticRangeViolationAndDivisionByZero>;
};

export type I64 =
    & SignedInteger<"I64">
    & {
    eq<T1 extends SignedInteger<T2>, T2 extends SignedIntegerBrand = SignedIntegerBrandMap<T1>>(x: T1): boolean;
    lt<T1 extends SignedInteger<T2>, T2 extends SignedIntegerBrand = SignedIntegerBrandMap<T1>>(x: T1): boolean;
    gt<T1 extends SignedInteger<T2>, T2 extends SignedIntegerBrand = SignedIntegerBrandMap<T1>>(x: T1): boolean;
    lteq<T1 extends SignedInteger<T2>, T2 extends SignedIntegerBrand = SignedIntegerBrandMap<T1>>(x: T1): boolean;
    gteq<T1 extends SignedInteger<T2>, T2 extends SignedIntegerBrand = SignedIntegerBrandMap<T1>>(x: T1): boolean;
    add<T1 extends SignedInteger<T2>, T2 extends SignedIntegerBrand = SignedIntegerBrandMap<T1>>(x: T1): LargestSignedIntegerResult<I64, T1, _UpperArithmeticRangeViolation>;
    sub<T1 extends SignedInteger<T2>, T2 extends SignedIntegerBrand = SignedIntegerBrandMap<T1>>(x: T1): LargestSignedIntegerResult<I64, T1, _LowerArithmeticRangeViolation>;
    mul<T1 extends SignedInteger<T2>, T2 extends SignedIntegerBrand = SignedIntegerBrandMap<T1>>(x: T1): LargestSignedIntegerResult<I64, T1, _ArithmeticRangeViolation>;
    div<T1 extends SignedInteger<T2>, T2 extends SignedIntegerBrand = SignedIntegerBrandMap<T1>>(x: T1): LargestSignedIntegerResult<I64, T1, _ArithmeticRangeViolationAndDivisionByZero>;
};

export type I128 =
    & SignedInteger<"I128">
    & {
    eq<T1 extends SignedInteger<T2>, T2 extends SignedIntegerBrand = SignedIntegerBrandMap<T1>>(x: T1): boolean;
    lt<T1 extends SignedInteger<T2>, T2 extends SignedIntegerBrand = SignedIntegerBrandMap<T1>>(x: T1): boolean;
    gt<T1 extends SignedInteger<T2>, T2 extends SignedIntegerBrand = SignedIntegerBrandMap<T1>>(x: T1): boolean;
    lteq<T1 extends SignedInteger<T2>, T2 extends SignedIntegerBrand = SignedIntegerBrandMap<T1>>(x: T1): boolean;
    gteq<T1 extends SignedInteger<T2>, T2 extends SignedIntegerBrand = SignedIntegerBrandMap<T1>>(x: T1): boolean;
    add<T1 extends SignedInteger<T2>, T2 extends SignedIntegerBrand = SignedIntegerBrandMap<T1>>(x: T1): LargestSignedIntegerResult<I128, T1, _UpperArithmeticRangeViolation>;
    sub<T1 extends SignedInteger<T2>, T2 extends SignedIntegerBrand = SignedIntegerBrandMap<T1>>(x: T1): LargestSignedIntegerResult<I128, T1, _LowerArithmeticRangeViolation>;
    mul<T1 extends SignedInteger<T2>, T2 extends SignedIntegerBrand = SignedIntegerBrandMap<T1>>(x: T1): LargestSignedIntegerResult<I128, T1, _ArithmeticRangeViolation>;
    div<T1 extends SignedInteger<T2>, T2 extends SignedIntegerBrand = SignedIntegerBrandMap<T1>>(x: T1): LargestSignedIntegerResult<I128, T1, _ArithmeticRangeViolationAndDivisionByZero>;
};

export type I256 =
    & SignedInteger<"I256">
    & {
    eq<T1 extends SignedInteger<T2>, T2 extends SignedIntegerBrand = SignedIntegerBrandMap<T1>>(x: T1): boolean;
    lt<T1 extends SignedInteger<T2>, T2 extends SignedIntegerBrand = SignedIntegerBrandMap<T1>>(x: T1): boolean;
    gt<T1 extends SignedInteger<T2>, T2 extends SignedIntegerBrand = SignedIntegerBrandMap<T1>>(x: T1): boolean;
    lteq<T1 extends SignedInteger<T2>, T2 extends SignedIntegerBrand = SignedIntegerBrandMap<T1>>(x: T1): boolean;
    gteq<T1 extends SignedInteger<T2>, T2 extends SignedIntegerBrand = SignedIntegerBrandMap<T1>>(x: T1): boolean;
    add<T1 extends SignedInteger<T2>, T2 extends SignedIntegerBrand = SignedIntegerBrandMap<T1>>(x: T1): LargestSignedIntegerResult<I256, T1, _UpperArithmeticRangeViolation>;
    sub<T1 extends SignedInteger<T2>, T2 extends SignedIntegerBrand = SignedIntegerBrandMap<T1>>(x: T1): LargestSignedIntegerResult<I256, T1, _LowerArithmeticRangeViolation>;
    mul<T1 extends SignedInteger<T2>, T2 extends SignedIntegerBrand = SignedIntegerBrandMap<T1>>(x: T1): LargestSignedIntegerResult<I256, T1, _ArithmeticRangeViolation>;
    div<T1 extends SignedInteger<T2>, T2 extends SignedIntegerBrand = SignedIntegerBrandMap<T1>>(x: T1): LargestSignedIntegerResult<I256, T1, _ArithmeticRangeViolationAndDivisionByZero>;
};

export type I =
    & SignedInteger<"I">
    & {
    eq<T1 extends SignedInteger<T2>, T2 extends SignedIntegerBrand = SignedIntegerBrandMap<T1>>(x: T1): boolean;
    lt<T1 extends SignedInteger<T2>, T2 extends SignedIntegerBrand = SignedIntegerBrandMap<T1>>(x: T1): boolean;
    gt<T1 extends SignedInteger<T2>, T2 extends SignedIntegerBrand = SignedIntegerBrandMap<T1>>(x: T1): boolean;
    lteq<T1 extends SignedInteger<T2>, T2 extends SignedIntegerBrand = SignedIntegerBrandMap<T1>>(x: T1): boolean;
    gteq<T1 extends SignedInteger<T2>, T2 extends SignedIntegerBrand = SignedIntegerBrandMap<T1>>(x: T1): boolean;
    add<T1 extends SignedInteger<T2>, T2 extends SignedIntegerBrand = SignedIntegerBrandMap<T1>>(x: T1): LargestSignedIntegerResult<I, T1, _UpperArithmeticRangeViolation>;
    sub<T1 extends SignedInteger<T2>, T2 extends SignedIntegerBrand = SignedIntegerBrandMap<T1>>(x: T1): LargestSignedIntegerResult<I, T1, _LowerArithmeticRangeViolation>;
    mul<T1 extends SignedInteger<T2>, T2 extends SignedIntegerBrand = SignedIntegerBrandMap<T1>>(x: T1): LargestSignedIntegerResult<I, T1, _ArithmeticRangeViolation>;
    div<T1 extends SignedInteger<T2>, T2 extends SignedIntegerBrand = SignedIntegerBrandMap<T1>>(x: T1): LargestSignedIntegerResult<I, T1, _ArithmeticRangeViolationAndDivisionByZero>;
};

export function I8<T1 extends NumberLike>(_x: T1): SignedIntegerResultMap<I8, T1> {
    /** @constructor */ {
        
    }
}

export function I16<T1 extends NumberLike>(_x: T1): SignedIntegerResultMap<I16, T1> {
    /** @constructor */ {

    }
}

export function I32<T1 extends NumberLike>(_x: T1): SignedIntegerResultMap<I32, T1> {
    /** @constructor */ {
        
    }
}

export function I64<T1 extends NumberLike>(_x: T1): SignedIntegerResultMap<I64, T1> {
    /** @constructor */ {

    }
}

export function I128<T1 extends NumberLike>(_x: T1): SignedIntegerResultMap<I128, T1> {
    /** @constructor */ {

    }
}

export function I256<T1 extends NumberLike>(_x: T1): SignedIntegerResultMap<I256, T1> {
    /** @constructor */ {

    }
}

export function I<T1 extends NumberLike>(_x: T1): SignedIntegerResultMap<I, T1> {
    /** @constructor */ {

    }
}


export type UnsignedIntegerResult<T1 extends UnsignedInteger<T3>, T2 extends MathErrorCode, T3 extends UnsignedIntegerBrand = UnsignedIntegerBrandMap<T1>> = Result<T1, MathError<T2>>;

export type UnsignedIntegerResultMap<T1 extends UnsignedInteger<T3>, T2 extends NumberLike, T3 extends UnsignedIntegerBrand = UnsignedIntegerBrandMap<T1>> =
    T1 extends U8
        ? T2 extends number  ? UnsignedIntegerResult<U8, _ArithmeticRangeAndPrecisionViolation>
        : T2 extends bigint  ? UnsignedIntegerResult<U8, _ArithmeticRangeViolation>
        : T2 extends Float   ? UnsignedIntegerResult<U8, _ArithmeticRangeAndPrecisionViolation>
        : T2 extends I8      ? UnsignedIntegerResult<U8, _LowerArithmeticRangeViolation>
        : T2 extends I16     ? UnsignedIntegerResult<U8, _ArithmeticRangeViolation>
        : T2 extends I32     ? UnsignedIntegerResult<U8, _ArithmeticRangeViolation>
        : T2 extends I64     ? UnsignedIntegerResult<U8, _ArithmeticRangeViolation>
        : T2 extends I128    ? UnsignedIntegerResult<U8, _ArithmeticRangeViolation>
        : T2 extends I256    ? UnsignedIntegerResult<U8, _ArithmeticRangeViolation>
        : T2 extends I       ? UnsignedIntegerResult<U8, _ArithmeticRangeViolation>
        : T2 extends U8      ? U8
        : T2 extends U16     ? UnsignedIntegerResult<U8, _UpperArithmeticRangeViolation>
        : T2 extends U32     ? UnsignedIntegerResult<U8, _UpperArithmeticRangeViolation>
        : T2 extends U64     ? UnsignedIntegerResult<U8, _UpperArithmeticRangeViolation>
        : T2 extends U128    ? UnsignedIntegerResult<U8, _UpperArithmeticRangeViolation>
        : T2 extends U256    ? UnsignedIntegerResult<U8, _UpperArithmeticRangeViolation>
        : T2 extends U       ? UnsignedIntegerResult<U8, _UpperArithmeticRangeViolation>
        : never :
    T1 extends U16
        ? T2 extends number  ? UnsignedIntegerResult<U16, _ArithmeticRangeAndPrecisionViolation>
        : T2 extends bigint  ? UnsignedIntegerResult<U16, _ArithmeticRangeViolation>
        : T2 extends Float   ? UnsignedIntegerResult<U16, _ArithmeticRangeAndPrecisionViolation>
        : T2 extends I8      ? UnsignedIntegerResult<U16, _LowerArithmeticRangeViolation>
        : T2 extends I16     ? UnsignedIntegerResult<U16, _LowerArithmeticRangeViolation>
        : T2 extends I32     ? UnsignedIntegerResult<U16, _ArithmeticRangeViolation>
        : T2 extends I64     ? UnsignedIntegerResult<U16, _ArithmeticRangeViolation>
        : T2 extends I128    ? UnsignedIntegerResult<U16, _ArithmeticRangeViolation>
        : T2 extends I256    ? UnsignedIntegerResult<U16, _ArithmeticRangeViolation>
        : T2 extends I       ? UnsignedIntegerResult<U16, _ArithmeticRangeViolation>
        : T2 extends U8      ? U8
        : T2 extends U16     ? U16
        : T2 extends U32     ? UnsignedIntegerResult<U16, _UpperArithmeticRangeViolation>
        : T2 extends U64     ? UnsignedIntegerResult<U16, _UpperArithmeticRangeViolation>
        : T2 extends U128    ? UnsignedIntegerResult<U16, _UpperArithmeticRangeViolation>
        : T2 extends U256    ? UnsignedIntegerResult<U16, _UpperArithmeticRangeViolation>
        : T2 extends U       ? UnsignedIntegerResult<U16, _UpperArithmeticRangeViolation>
        : never :
    T1 extends U32
        ? T2 extends number  ? UnsignedIntegerResult<U32, _ArithmeticRangeAndPrecisionViolation>
        : T2 extends bigint  ? UnsignedIntegerResult<U32, _ArithmeticRangeViolation>
        : T2 extends Float   ? UnsignedIntegerResult<U32, _ArithmeticRangeAndPrecisionViolation>
        : T2 extends I8      ? UnsignedIntegerResult<U32, _LowerArithmeticRangeViolation>
        : T2 extends I16     ? UnsignedIntegerResult<U32, _LowerArithmeticRangeViolation>
        : T2 extends I32     ? UnsignedIntegerResult<U32, _LowerArithmeticRangeViolation>
        : T2 extends I64     ? UnsignedIntegerResult<U32, _ArithmeticRangeViolation>
        : T2 extends I128    ? UnsignedIntegerResult<U32, _ArithmeticRangeViolation>
        : T2 extends I256    ? UnsignedIntegerResult<U32, _ArithmeticRangeViolation>
        : T2 extends I       ? UnsignedIntegerResult<U32, _ArithmeticRangeViolation>
        : T2 extends U8      ? U32
        : T2 extends U16     ? U32
        : T2 extends U32     ? U32
        : T2 extends U64     ? UnsignedIntegerResult<U32, _UpperArithmeticRangeViolation>
        : T2 extends U128    ? UnsignedIntegerResult<U32, _UpperArithmeticRangeViolation>
        : T2 extends U256    ? UnsignedIntegerResult<U32, _UpperArithmeticRangeViolation>
        : T2 extends U       ? UnsignedIntegerResult<U32, _UpperArithmeticRangeViolation>
        : never:
    T1 extends U64
        ? T2 extends number  ? UnsignedIntegerResult<U64, _ArithmeticRangeAndPrecisionViolation>
        : T2 extends bigint  ? UnsignedIntegerResult<U64, _ArithmeticRangeViolation>
        : T2 extends Float   ? UnsignedIntegerResult<U64, _LowerArithmeticRangeAndPrecisionViolation>
        : T2 extends I8      ? UnsignedIntegerResult<U64, _LowerArithmeticRangeViolation>
        : T2 extends I16     ? UnsignedIntegerResult<U64, _LowerArithmeticRangeViolation>
        : T2 extends I32     ? UnsignedIntegerResult<U64, _LowerArithmeticRangeViolation>
        : T2 extends I64     ? UnsignedIntegerResult<U64, _LowerArithmeticRangeViolation>
        : T2 extends I128    ? UnsignedIntegerResult<U64, _ArithmeticRangeViolation>
        : T2 extends I256    ? UnsignedIntegerResult<U64, _ArithmeticRangeViolation>
        : T2 extends I       ? UnsignedIntegerResult<U64, _ArithmeticRangeViolation>
        : T2 extends U8      ? U64
        : T2 extends U16     ? U64
        : T2 extends U32     ? U64
        : T2 extends U64     ? U64
        : T2 extends U128    ? UnsignedIntegerResult<U64, _UpperArithmeticRangeViolation>
        : T2 extends U256    ? UnsignedIntegerResult<U64, _UpperArithmeticRangeViolation>
        : T2 extends U       ? UnsignedIntegerResult<U64, _UpperArithmeticRangeViolation>
        : never :
    T1 extends U128
        ? T2 extends number  ? UnsignedIntegerResult<U128, _ArithmeticRangeAndPrecisionViolation>
        : T2 extends bigint  ? UnsignedIntegerResult<U128, _ArithmeticRangeViolation>
        : T2 extends Float   ? UnsignedIntegerResult<U128, _LowerArithmeticRangeAndPrecisionViolation>
        : T2 extends I8      ? UnsignedIntegerResult<U128, _LowerArithmeticRangeViolation>
        : T2 extends I16     ? UnsignedIntegerResult<U128, _LowerArithmeticRangeViolation>
        : T2 extends I32     ? UnsignedIntegerResult<U128, _LowerArithmeticRangeViolation>
        : T2 extends I64     ? UnsignedIntegerResult<U128, _LowerArithmeticRangeViolation>
        : T2 extends I128    ? UnsignedIntegerResult<U128, _LowerArithmeticRangeViolation>
        : T2 extends I256    ? UnsignedIntegerResult<U128, _ArithmeticRangeViolation>
        : T2 extends I       ? UnsignedIntegerResult<U128, _ArithmeticRangeViolation>
        : T2 extends U8      ? U128
        : T2 extends U16     ? U128
        : T2 extends U32     ? U128
        : T2 extends U64     ? U128
        : T2 extends U128    ? U128
        : T2 extends U256    ? UnsignedIntegerResult<U128, _UpperArithmeticRangeViolation>
        : T2 extends U       ? UnsignedIntegerResult<U128, _UpperArithmeticRangeViolation>
        : never :
    T1 extends U256
        ? T2 extends number  ? UnsignedIntegerResult<U256, _ArithmeticRangeAndPrecisionViolation>
        : T2 extends bigint  ? UnsignedIntegerResult<U256, _ArithmeticRangeViolation>
        : T2 extends Float   ? UnsignedIntegerResult<U256, _LowerArithmeticRangeAndPrecisionViolation>
        : T2 extends I8      ? UnsignedIntegerResult<U256, _LowerArithmeticRangeViolation>
        : T2 extends I16     ? UnsignedIntegerResult<U256, _LowerArithmeticRangeViolation>
        : T2 extends I32     ? UnsignedIntegerResult<U256, _LowerArithmeticRangeViolation>
        : T2 extends I64     ? UnsignedIntegerResult<U256, _LowerArithmeticRangeViolation>
        : T2 extends I128    ? UnsignedIntegerResult<U256, _LowerArithmeticRangeViolation>
        : T2 extends I256    ? UnsignedIntegerResult<U256, _LowerArithmeticRangeViolation>
        : T2 extends I       ? UnsignedIntegerResult<U256, _ArithmeticRangeViolation>
        : T2 extends U8      ? U256
        : T2 extends U16     ? U256
        : T2 extends U32     ? U256
        : T2 extends U64     ? U256
        : T2 extends U128    ? U256
        : T2 extends U256    ? U256
        : T2 extends U       ? UnsignedIntegerResult<U256, _UpperArithmeticRangeViolation>
        : never :
    T1 extends U
        ? T2 extends number  ? UnsignedIntegerResult<U, _ArithmeticRangeAndPrecisionViolation>
        : T2 extends bigint  ? UnsignedIntegerResult<U, _LowerArithmeticRangeViolation>
        : T2 extends Float   ? UnsignedIntegerResult<U, _LowerArithmeticRangeAndPrecisionViolation>
        : T2 extends I8      ? UnsignedIntegerResult<U, _LowerArithmeticRangeViolation>
        : T2 extends I16     ? UnsignedIntegerResult<U, _LowerArithmeticRangeViolation>
        : T2 extends I32     ? UnsignedIntegerResult<U, _LowerArithmeticRangeViolation>
        : T2 extends I64     ? UnsignedIntegerResult<U, _LowerArithmeticRangeViolation>
        : T2 extends I128    ? UnsignedIntegerResult<U, _LowerArithmeticRangeViolation>
        : T2 extends I256    ? UnsignedIntegerResult<U, _LowerArithmeticRangeViolation>
        : T2 extends I       ? UnsignedIntegerResult<U, _LowerArithmeticRangeViolation>
        : T2 extends U8      ? U
        : T2 extends U16     ? U
        : T2 extends U32     ? U
        : T2 extends U64     ? U
        : T2 extends U128    ? U
        : T2 extends U256    ? U
        : T2 extends U       ? U
        : never :
    never;

export type LargestUnsignedIntegerResult<T1 extends UnsignedInteger<any>, T2 extends UnsignedInteger<any>, T3 extends MathErrorCode> = Result<LargestUnsignedInteger<T1, T2>, MathError<T3>>;

export type LargestUnsignedInteger<T1 extends UnsignedInteger<T3>, T2 extends UnsignedInteger<T4>, T3 extends UnsignedIntegerBrand = UnsignedIntegerBrandMap<T1>, T4 extends UnsignedIntegerBrand = UnsignedIntegerBrandMap<T2>> =
    T1 extends T2    ? T2 :
    T1 extends U     ? T1 :
    T2 extends U     ? T2 :
    T1 extends U256  ? T1 :
    T2 extends U256  ? T2 :
    T1 extends U128  ? T1 :
    T2 extends U128  ? T2 :
    T1 extends U64   ? T1 :
    T2 extends U64   ? T2 :
    T1 extends U32   ? T1 :
    T2 extends U32   ? T2 :
    T1 extends U16   ? T1 :
    T2 extends U16   ? T2 :
    T1 extends U8    ? T1 :
    T2 extends U8    ? T2 :
    never;

export type UnsignedIntegerBrandMap<T1 extends UnsignedInteger<UnsignedIntegerBrand>> =
    T1 extends U8    ? "U8" :
    T1 extends U16   ? "U16" :
    T1 extends U32   ? "U32" :
    T1 extends U64   ? "U64" :
    T1 extends U128  ? "U128" :
    T1 extends U256  ? "U256" :
    T1 extends U     ? "U" :
    never;

export type UnsignedIntegerBrand = "U8" | "U16" | "U32" | "U64" | "U128" | "U256" | "U";

export type UnsignedInteger<T1 extends UnsignedIntegerBrand> =
    & Branded<T1>
    & Wrapper<bigint>;

export type U8 =
    & UnsignedInteger<"U8"> 
    & {
    eq<T1 extends UnsignedInteger<T2>, T2 extends UnsignedIntegerBrand = UnsignedIntegerBrandMap<T1>>(x: T1): boolean;
    lt<T1 extends UnsignedInteger<T2>, T2 extends UnsignedIntegerBrand = UnsignedIntegerBrandMap<T1>>(x: T1): boolean;
    gt<T1 extends UnsignedInteger<T2>, T2 extends UnsignedIntegerBrand = UnsignedIntegerBrandMap<T1>>(x: T1): boolean;
    lteq<T1 extends UnsignedInteger<T2>, T2 extends UnsignedIntegerBrand = UnsignedIntegerBrandMap<T1>>(x: T1): boolean;
    gteq<T1 extends UnsignedInteger<T2>, T2 extends UnsignedIntegerBrand = UnsignedIntegerBrandMap<T1>>(x: T1): boolean;
    add<T1 extends UnsignedInteger<T2>, T2 extends UnsignedIntegerBrand = UnsignedIntegerBrandMap<T1>>(x: T1): LargestUnsignedIntegerResult<U8, T1, _UpperArithmeticRangeViolation>;
    sub<T1 extends UnsignedInteger<T2>, T2 extends UnsignedIntegerBrand = UnsignedIntegerBrandMap<T1>>(x: T1): LargestUnsignedIntegerResult<U8, T1, _LowerArithmeticRangeViolation>;
    mul<T1 extends UnsignedInteger<T2>, T2 extends UnsignedIntegerBrand = UnsignedIntegerBrandMap<T1>>(x: T1): LargestUnsignedIntegerResult<U8, T1, _UpperArithmeticRangeViolation>;
    div<T1 extends UnsignedInteger<T2>, T2 extends UnsignedIntegerBrand = UnsignedIntegerBrandMap<T1>>(x: T1): LargestUnsignedIntegerResult<U8, T1, _DivisionByZero>;
};

export type U16 =
    & UnsignedInteger<"U16">
    & {
    eq<T1 extends UnsignedInteger<T2>, T2 extends UnsignedIntegerBrand = UnsignedIntegerBrandMap<T1>>(x: T1): boolean;
    lt<T1 extends UnsignedInteger<T2>, T2 extends UnsignedIntegerBrand = UnsignedIntegerBrandMap<T1>>(x: T1): boolean;
    gt<T1 extends UnsignedInteger<T2>, T2 extends UnsignedIntegerBrand = UnsignedIntegerBrandMap<T1>>(x: T1): boolean;
    lteq<T1 extends UnsignedInteger<T2>, T2 extends UnsignedIntegerBrand = UnsignedIntegerBrandMap<T1>>(x: T1): boolean;
    gteq<T1 extends UnsignedInteger<T2>, T2 extends UnsignedIntegerBrand = UnsignedIntegerBrandMap<T1>>(x: T1): boolean;
    add<T1 extends UnsignedInteger<T2>, T2 extends UnsignedIntegerBrand = UnsignedIntegerBrandMap<T1>>(x: T1): LargestUnsignedIntegerResult<U16, T1, _UpperArithmeticRangeViolation>;
    sub<T1 extends UnsignedInteger<T2>, T2 extends UnsignedIntegerBrand = UnsignedIntegerBrandMap<T1>>(x: T1): LargestUnsignedIntegerResult<U16, T1, _LowerArithmeticRangeViolation>;
    mul<T1 extends UnsignedInteger<T2>, T2 extends UnsignedIntegerBrand = UnsignedIntegerBrandMap<T1>>(x: T1): LargestUnsignedIntegerResult<U16, T1, _UpperArithmeticRangeViolation>;
    div<T1 extends UnsignedInteger<T2>, T2 extends UnsignedIntegerBrand = UnsignedIntegerBrandMap<T1>>(x: T1): LargestUnsignedIntegerResult<U16, T1, _DivisionByZero>;
};
    
export type U32 =
    & UnsignedInteger<"U32">
    & {
    eq<T1 extends UnsignedInteger<T2>, T2 extends UnsignedIntegerBrand = UnsignedIntegerBrandMap<T1>>(x: T1): boolean;
    lt<T1 extends UnsignedInteger<T2>, T2 extends UnsignedIntegerBrand = UnsignedIntegerBrandMap<T1>>(x: T1): boolean;
    gt<T1 extends UnsignedInteger<T2>, T2 extends UnsignedIntegerBrand = UnsignedIntegerBrandMap<T1>>(x: T1): boolean;
    lteq<T1 extends UnsignedInteger<T2>, T2 extends UnsignedIntegerBrand = UnsignedIntegerBrandMap<T1>>(x: T1): boolean;
    gteq<T1 extends UnsignedInteger<T2>, T2 extends UnsignedIntegerBrand = UnsignedIntegerBrandMap<T1>>(x: T1): boolean;
    add<T1 extends UnsignedInteger<T2>, T2 extends UnsignedIntegerBrand = UnsignedIntegerBrandMap<T1>>(x: T1): LargestUnsignedIntegerResult<U32, T1, _UpperArithmeticRangeViolation>;
    sub<T1 extends UnsignedInteger<T2>, T2 extends UnsignedIntegerBrand = UnsignedIntegerBrandMap<T1>>(x: T1): LargestUnsignedIntegerResult<U32, T1, _LowerArithmeticRangeViolation>;
    mul<T1 extends UnsignedInteger<T2>, T2 extends UnsignedIntegerBrand = UnsignedIntegerBrandMap<T1>>(x: T1): LargestUnsignedIntegerResult<U32, T1, _UpperArithmeticRangeViolation>;
    div<T1 extends UnsignedInteger<T2>, T2 extends UnsignedIntegerBrand = UnsignedIntegerBrandMap<T1>>(x: T1): LargestUnsignedIntegerResult<U32, T1, _DivisionByZero>;
};

export type U64 =
    & UnsignedInteger<"U64">
    & {
    eq<T1 extends UnsignedInteger<T2>, T2 extends UnsignedIntegerBrand = UnsignedIntegerBrandMap<T1>>(x: T1): boolean;
    lt<T1 extends UnsignedInteger<T2>, T2 extends UnsignedIntegerBrand = UnsignedIntegerBrandMap<T1>>(x: T1): boolean;
    gt<T1 extends UnsignedInteger<T2>, T2 extends UnsignedIntegerBrand = UnsignedIntegerBrandMap<T1>>(x: T1): boolean;
    lteq<T1 extends UnsignedInteger<T2>, T2 extends UnsignedIntegerBrand = UnsignedIntegerBrandMap<T1>>(x: T1): boolean;
    gteq<T1 extends UnsignedInteger<T2>, T2 extends UnsignedIntegerBrand = UnsignedIntegerBrandMap<T1>>(x: T1): boolean;
    add<T1 extends UnsignedInteger<T2>, T2 extends UnsignedIntegerBrand = UnsignedIntegerBrandMap<T1>>(x: T1): LargestUnsignedIntegerResult<U64, T1, _UpperArithmeticRangeViolation>;
    sub<T1 extends UnsignedInteger<T2>, T2 extends UnsignedIntegerBrand = UnsignedIntegerBrandMap<T1>>(x: T1): LargestUnsignedIntegerResult<U64, T1, _LowerArithmeticRangeViolation>;
    mul<T1 extends UnsignedInteger<T2>, T2 extends UnsignedIntegerBrand = UnsignedIntegerBrandMap<T1>>(x: T1): LargestUnsignedIntegerResult<U64, T1, _UpperArithmeticRangeViolation>;
    div<T1 extends UnsignedInteger<T2>, T2 extends UnsignedIntegerBrand = UnsignedIntegerBrandMap<T1>>(x: T1): LargestUnsignedIntegerResult<U64, T1, _DivisionByZero>;
};

export type U128 =
    & UnsignedInteger<"U128">
    & {
    eq<T1 extends UnsignedInteger<T2>, T2 extends UnsignedIntegerBrand = UnsignedIntegerBrandMap<T1>>(x: T1): boolean;
    lt<T1 extends UnsignedInteger<T2>, T2 extends UnsignedIntegerBrand = UnsignedIntegerBrandMap<T1>>(x: T1): boolean;
    gt<T1 extends UnsignedInteger<T2>, T2 extends UnsignedIntegerBrand = UnsignedIntegerBrandMap<T1>>(x: T1): boolean;
    lteq<T1 extends UnsignedInteger<T2>, T2 extends UnsignedIntegerBrand = UnsignedIntegerBrandMap<T1>>(x: T1): boolean;
    gteq<T1 extends UnsignedInteger<T2>, T2 extends UnsignedIntegerBrand = UnsignedIntegerBrandMap<T1>>(x: T1): boolean;
    add<T1 extends UnsignedInteger<T2>, T2 extends UnsignedIntegerBrand = UnsignedIntegerBrandMap<T1>>(x: T1): LargestUnsignedIntegerResult<U128, T1, _UpperArithmeticRangeViolation>;
    sub<T1 extends UnsignedInteger<T2>, T2 extends UnsignedIntegerBrand = UnsignedIntegerBrandMap<T1>>(x: T1): LargestUnsignedIntegerResult<U128, T1, _LowerArithmeticRangeViolation>;
    mul<T1 extends UnsignedInteger<T2>, T2 extends UnsignedIntegerBrand = UnsignedIntegerBrandMap<T1>>(x: T1): LargestUnsignedIntegerResult<U128, T1, _UpperArithmeticRangeViolation>;
    div<T1 extends UnsignedInteger<T2>, T2 extends UnsignedIntegerBrand = UnsignedIntegerBrandMap<T1>>(x: T1): LargestUnsignedIntegerResult<U128, T1, _DivisionByZero>;
};

export type U256 =
    & UnsignedInteger<"U256">
    & {
    eq<T1 extends UnsignedInteger<T2>, T2 extends UnsignedIntegerBrand = UnsignedIntegerBrandMap<T1>>(x: T1): boolean;
    lt<T1 extends UnsignedInteger<T2>, T2 extends UnsignedIntegerBrand = UnsignedIntegerBrandMap<T1>>(x: T1): boolean;
    gt<T1 extends UnsignedInteger<T2>, T2 extends UnsignedIntegerBrand = UnsignedIntegerBrandMap<T1>>(x: T1): boolean;
    lteq<T1 extends UnsignedInteger<T2>, T2 extends UnsignedIntegerBrand = UnsignedIntegerBrandMap<T1>>(x: T1): boolean;
    gteq<T1 extends UnsignedInteger<T2>, T2 extends UnsignedIntegerBrand = UnsignedIntegerBrandMap<T1>>(x: T1): boolean;
    add<T1 extends UnsignedInteger<T2>, T2 extends UnsignedIntegerBrand = UnsignedIntegerBrandMap<T1>>(x: T1): LargestUnsignedIntegerResult<U256, T1, _UpperArithmeticRangeViolation>;
    sub<T1 extends UnsignedInteger<T2>, T2 extends UnsignedIntegerBrand = UnsignedIntegerBrandMap<T1>>(x: T1): LargestUnsignedIntegerResult<U256, T1, _LowerArithmeticRangeViolation>;
    mul<T1 extends UnsignedInteger<T2>, T2 extends UnsignedIntegerBrand = UnsignedIntegerBrandMap<T1>>(x: T1): LargestUnsignedIntegerResult<U256, T1, _UpperArithmeticRangeViolation>;
    div<T1 extends UnsignedInteger<T2>, T2 extends UnsignedIntegerBrand = UnsignedIntegerBrandMap<T1>>(x: T1): LargestUnsignedIntegerResult<U256, T1, _DivisionByZero>;
};

export type U =
    & UnsignedInteger<"U">
    & {
    eq<T1 extends UnsignedInteger<T2>, T2 extends UnsignedIntegerBrand = UnsignedIntegerBrandMap<T1>>(x: T1): boolean;
    lt<T1 extends UnsignedInteger<T2>, T2 extends UnsignedIntegerBrand = UnsignedIntegerBrandMap<T1>>(x: T1): boolean;
    gt<T1 extends UnsignedInteger<T2>, T2 extends UnsignedIntegerBrand = UnsignedIntegerBrandMap<T1>>(x: T1): boolean;
    lteq<T1 extends UnsignedInteger<T2>, T2 extends UnsignedIntegerBrand = UnsignedIntegerBrandMap<T1>>(x: T1): boolean;
    gteq<T1 extends UnsignedInteger<T2>, T2 extends UnsignedIntegerBrand = UnsignedIntegerBrandMap<T1>>(x: T1): boolean;
    add<T1 extends UnsignedInteger<T2>, T2 extends UnsignedIntegerBrand = UnsignedIntegerBrandMap<T1>>(x: T1): LargestUnsignedIntegerResult<U, T1, _UpperArithmeticRangeViolation>;
    sub<T1 extends UnsignedInteger<T2>, T2 extends UnsignedIntegerBrand = UnsignedIntegerBrandMap<T1>>(x: T1): LargestUnsignedIntegerResult<U, T1, _LowerArithmeticRangeViolation>;
    mul<T1 extends UnsignedInteger<T2>, T2 extends UnsignedIntegerBrand = UnsignedIntegerBrandMap<T1>>(x: T1): LargestUnsignedIntegerResult<U, T1, _UpperArithmeticRangeViolation>;
    div<T1 extends UnsignedInteger<T2>, T2 extends UnsignedIntegerBrand = UnsignedIntegerBrandMap<T1>>(x: T1): LargestUnsignedIntegerResult<U, T1, _DivisionByZero>;
};

export function U8<T1 extends NumberLike>(_x: T1): UnsignedIntegerResultMap<U8, T1> {
    /** @constructor */ {
        
    }
}

export function U16<T1 extends NumberLike>(_x: T1): UnsignedIntegerResultMap<U16, T1> {
    /** @constructor */ {

    }
}

export function U32<T1 extends NumberLike>(_x: T1): UnsignedIntegerResultMap<U32, T1> {
    /** @constructor */ {

    }
}

export function U64<T1 extends NumberLike>(_x: T1): UnsignedIntegerResultMap<U64, T1> {
    /** @constructor */ {

    }
}

export function U128<T1 extends NumberLike>(_x: T1): UnsignedIntegerResultMap<U128, T1> {
    /** @constructor */ {

    }
}

export function U256<T1 extends NumberLike>(_x: T1): UnsignedIntegerResultMap<U256, T1> {
    /** @constructor */ {

    }
}

export function U<T1 extends NumberLike>(_x: T1): UnsignedIntegerResultMap<U, T1> {
    /** @constructor */ {

    }
}



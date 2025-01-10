import { type Branded } from "@root";
import { type Wrapper } from "@root";
import { Result } from "@root";
import { Option } from "@root";

export type NumberIsh = Float | number | bigint | I8 | I16 | I32 | I64 | I128 | I256 | I | U8 | U16 | U32 | U64 | U128 | U256 | U;

export type Float = {

};



export type IRIsh<T1 extends IIsh<T3>, T2 extends MathErrorCode, T3 extends IIshBrand = IIshBrandMap<T1>> = Result<T1, MathError<T2>>;

export type IRMap<T1 extends IIsh<T3>, T2 extends NumberIsh, T3 extends IIshBrand = IIshBrandMap<T1>> =
    T1 extends I8
        ? T2 extends number  ? IRIsh<I8, _ArithmeticRangeAndPrecisionViolation>
        : T2 extends bigint  ? IRIsh<I8, _ArithmeticRangeViolation> 
        : T2 extends Float   ? IRIsh<I8, _ArithmeticRangeAndPrecisionViolation>
        : T2 extends I8      ? I8
        : T2 extends I16     ? IRIsh<I8, _ArithmeticRangeViolation>
        : T2 extends I32     ? IRIsh<I8, _ArithmeticRangeViolation>
        : T2 extends I64     ? IRIsh<I8, _ArithmeticRangeViolation>
        : T2 extends I128    ? IRIsh<I8, _ArithmeticRangeViolation>
        : T2 extends I256    ? IRIsh<I8, _ArithmeticRangeViolation>
        : T2 extends I       ? IRIsh<I8, _ArithmeticRangeViolation>
        : T2 extends U8      ? I8
        : T2 extends U16     ? IRIsh<I8, _UpperArithmeticRangeViolation>
        : T2 extends U32     ? IRIsh<I8, _UpperArithmeticRangeViolation>
        : T2 extends U64     ? IRIsh<I8, _UpperArithmeticRangeViolation>
        : T2 extends U128    ? IRIsh<I8, _UpperArithmeticRangeViolation>
        : T2 extends U256    ? IRIsh<I8, _UpperArithmeticRangeViolation>
        : T2 extends U       ? IRIsh<I8, _UpperArithmeticRangeViolation> 
        : never :
    T1 extends I16
        ? T2 extends number  ? IRIsh<I16, _ArithmeticRangeAndPrecisionViolation>
        : T2 extends bigint  ? IRIsh<I16, _ArithmeticRangeViolation>
        : T2 extends Float   ? IRIsh<I16, _ArithmeticRangeAndPrecisionViolation>
        : T2 extends I8      ? I16
        : T2 extends I16     ? I16
        : T2 extends I32     ? IRIsh<I16, _ArithmeticRangeViolation>
        : T2 extends I64     ? IRIsh<I16, _ArithmeticRangeViolation>
        : T2 extends I128    ? IRIsh<I16, _ArithmeticRangeViolation>
        : T2 extends I256    ? IRIsh<I16, _ArithmeticRangeViolation>
        : T2 extends I       ? IRIsh<I16, _ArithmeticRangeViolation>
        : T2 extends U8      ? I16
        : T2 extends U16     ? I16
        : T2 extends U32     ? IRIsh<I16, _UpperArithmeticRangeViolation>
        : T2 extends U64     ? IRIsh<I16, _UpperArithmeticRangeViolation>
        : T2 extends U128    ? IRIsh<I16, _UpperArithmeticRangeViolation>
        : T2 extends U256    ? IRIsh<I16, _UpperArithmeticRangeViolation>
        : T2 extends U       ? IRIsh<I16, _UpperArithmeticRangeViolation>
        : never :
    T1 extends I32
        ? T2 extends number  ? IRIsh<I32, _ArithmeticRangeAndPrecisionViolation>
        : T2 extends bigint  ? IRIsh<I32, _ArithmeticRangeViolation>
        : T2 extends Float   ? IRIsh<I32, _ArithmeticRangeAndPrecisionViolation>
        : T2 extends I8      ? I32
        : T2 extends I16     ? I32
        : T2 extends I32     ? I32
        : T2 extends I64     ? IRIsh<I32, _ArithmeticRangeViolation>
        : T2 extends I128    ? IRIsh<I32, _ArithmeticRangeViolation>
        : T2 extends I256    ? IRIsh<I32, _ArithmeticRangeViolation>
        : T2 extends I       ? IRIsh<I32, _ArithmeticRangeViolation>
        : T2 extends U8      ? I32
        : T2 extends U16     ? I32
        : T2 extends U32     ? I32
        : T2 extends U64     ? IRIsh<I32, _UpperArithmeticRangeViolation>
        : T2 extends U128    ? IRIsh<I32, _UpperArithmeticRangeViolation>
        : T2 extends U256    ? IRIsh<I32, _UpperArithmeticRangeViolation>
        : T2 extends U       ? IRIsh<I32, _UpperArithmeticRangeViolation>
        : never :
    T1 extends I64
        ? T2 extends number  ? IRIsh<I64, _PrecisionViolation>
        : T2 extends bigint  ? IRIsh<I64, _ArithmeticRangeViolation>
        : T2 extends Float   ? IRIsh<I64, _PrecisionViolation>
        : T2 extends I8      ? I64
        : T2 extends I16     ? I64
        : T2 extends I32     ? I64
        : T2 extends I64     ? I64
        : T2 extends I128    ? IRIsh<I64, _ArithmeticRangeViolation>
        : T2 extends I256    ? IRIsh<I64, _ArithmeticRangeViolation>
        : T2 extends I       ? IRIsh<I64, _ArithmeticRangeViolation>
        : T2 extends U8      ? I64
        : T2 extends U16     ? I64
        : T2 extends U32     ? I64 
        : T2 extends U64     ? I64
        : T2 extends U128    ? IRIsh<I64, _ArithmeticRangeViolation>
        : T2 extends U256    ? IRIsh<I64, _ArithmeticRangeViolation>
        : T2 extends U       ? IRIsh<I64, _ArithmeticRangeViolation>
        : never :
    T1 extends I128
        ? T2 extends number  ? IRIsh<I128, _PrecisionViolation>
        : T2 extends bigint  ? IRIsh<I128, _ArithmeticRangeViolation>
        : T2 extends Float   ? IRIsh<I128, _PrecisionViolation>
        : T2 extends I8      ? I128
        : T2 extends I16     ? I128
        : T2 extends I32     ? I128
        : T2 extends I64     ? I128
        : T2 extends I128    ? I128
        : T2 extends I256    ? IRIsh<I128, _ArithmeticRangeViolation>
        : T2 extends I       ? IRIsh<I128, _ArithmeticRangeViolation>
        : T2 extends U8      ? I128
        : T2 extends U16     ? I128
        : T2 extends U32     ? I128
        : T2 extends U64     ? I128
        : T2 extends U128    ? I128
        : T2 extends U256    ? IRIsh<I128, _UpperArithmeticRangeViolation>
        : T2 extends U       ? IRIsh<I128, _UpperArithmeticRangeViolation>
        : never :
    T1 extends I256
        ? T2 extends number  ? IRIsh<I256, _PrecisionViolation>
        : T2 extends bigint  ? IRIsh<I256, _ArithmeticRangeViolation>
        : T2 extends Float   ? IRIsh<I256, _PrecisionViolation>
        : T2 extends I8      ? I256
        : T2 extends I16     ? I256
        : T2 extends I32     ? I256
        : T2 extends I64     ? I256
        : T2 extends I128    ? I256
        : T2 extends I256    ? I256
        : T2 extends I       ? IRIsh<I256, _ArithmeticRangeViolation>
        : T2 extends U8      ? I256
        : T2 extends U16     ? I256
        : T2 extends U32     ? I256
        : T2 extends U64     ? I256
        : T2 extends U128    ? I256
        : T2 extends U256    ? I256
        : T2 extends U       ? IRIsh<I256, _ArithmeticRangeViolation>
        : never :
    T1 extends I
        ? T2 extends number  ? IRIsh<I, _PrecisionViolation>
        : T2 extends bigint  ? I
        : T2 extends Float   ? IRIsh<I, _PrecisionViolation>
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

export type LargestIR<T1 extends IIsh<any>, T2 extends IIsh<any>, T3 extends MathErrorCode> = Result<LargestI<T1, T2>, MathError<T3>>;

export type LargestI<T1 extends IIsh<T3>, T2 extends IIsh<T4>, T3 extends IIshBrand = IIshBrandMap<T1>, T4 extends IIshBrand = IIshBrandMap<T2>> =
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

export type IIshBrandMap<T1 extends IIsh<IIshBrand>> = 
    T1 extends I8    ? "I8" :
    T1 extends I16   ? "I16" :
    T1 extends I32   ? "I32" :
    T1 extends I64   ? "I64" :
    T1 extends I128  ? "I128" :
    T1 extends I256  ? "I256" :
    T1 extends I     ? "I" :
    never;

export type IIshBrand = "I8" | "I16" | "I32" | "I64" | "I128" | "I256" | "I";

export type IIsh<T1 extends IIshBrand> = 
    & Branded<T1> 
    & Wrapper<bigint>;

export type I8 = 
    & IIsh<"I8">
    & {
    eq<T1 extends IIsh<T2>, T2 extends IIshBrand = IIshBrandMap<T1>>(x: T1): boolean;
    lt<T1 extends IIsh<T2>, T2 extends IIshBrand = IIshBrandMap<T1>>(x: T1): boolean;
    gt<T1 extends IIsh<T2>, T2 extends IIshBrand = IIshBrandMap<T1>>(x: T1): boolean;
    lteq<T1 extends IIsh<T2>, T2 extends IIshBrand = IIshBrandMap<T1>>(x: T1): boolean;
    gteq<T1 extends IIsh<T2>, T2 extends IIshBrand = IIshBrandMap<T1>>(x: T1): boolean;
    add<T1 extends IIsh<T2>, T2 extends IIshBrand = IIshBrandMap<T1>>(x: T1): LargestIR<I8, T1, _UpperArithmeticRangeViolation>;
    sub<T1 extends IIsh<T2>, T2 extends IIshBrand = IIshBrandMap<T1>>(x: T1): LargestIR<I8, T1, _LowerArithmeticRangeViolation>;
    mul<T1 extends IIsh<T2>, T2 extends IIshBrand = IIshBrandMap<T1>>(x: T1): LargestIR<I8, T1, _ArithmeticRangeViolation>;
    div<T1 extends IIsh<T2>, T2 extends IIshBrand = IIshBrandMap<T1>>(x: T1): LargestIR<I8, T1, _ArithmeticRangeViolationAndDivisionByZero>;
};

export function I8<T1 extends NumberIsh>(_x: NumberIsh): IRMap<I8, T1> {}

export type I16 = 
    & IIsh<"I16">
    & {
    eq<T1 extends IIsh<T2>, T2 extends IIshBrand = IIshBrandMap<T1>>(x: T1): boolean;
    lt<T1 extends IIsh<T2>, T2 extends IIshBrand = IIshBrandMap<T1>>(x: T1): boolean;
    gt<T1 extends IIsh<T2>, T2 extends IIshBrand = IIshBrandMap<T1>>(x: T1): boolean;
    lteq<T1 extends IIsh<T2>, T2 extends IIshBrand = IIshBrandMap<T1>>(x: T1): boolean;
    gteq<T1 extends IIsh<T2>, T2 extends IIshBrand = IIshBrandMap<T1>>(x: T1): boolean;
    add<T1 extends IIsh<T2>, T2 extends IIshBrand = IIshBrandMap<T1>>(x: T1): LargestIR<I16, T1, _UpperArithmeticRangeViolation>;
    sub<T1 extends IIsh<T2>, T2 extends IIshBrand = IIshBrandMap<T1>>(x: T1): LargestIR<I16, T1, _LowerArithmeticRangeViolation>;
    mul<T1 extends IIsh<T2>, T2 extends IIshBrand = IIshBrandMap<T1>>(x: T1): LargestIR<I16, T1, _ArithmeticRangeViolation>;
    div<T1 extends IIsh<T2>, T2 extends IIshBrand = IIshBrandMap<T1>>(x: T1): LargestIR<I16, T1, _ArithmeticRangeViolationAndDivisionByZero>;
};

export function I16<T1 extends NumberIsh>(_x: NumberIsh): IRMap<I16, T1> {}




export type I32      = IIsh<"I32">;
export type I64      = IIsh<"I64">;
export type I128     = IIsh<"I128">;
export type I256     = IIsh<"I256">;
export type I        = IIsh<"I">;









    











































export type UIshBrand = "U8" | "U16" | "U32" | "U64" | "U128" | "U256" | "U";

export type UIsh<T1 extends UIshBrand> =
    & Branded<T1>
    & Wrapper<bigint>
    & {};

export type U8 = 
    & UIsh<"U8">
    & {

};

export type U16 = UIsh<"U16">;
export type U32 = UIsh<"U32">;
export type U64 = UIsh<"U64">;
export type U128 = UIsh<"U128">;
export type U256 = UIsh<"U256">;
export type U = UIsh<"U">;


// #region Constant

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
export const MAX_I256: I256 = I256(MAX_256);
export const MIN_I256: I256 = I256(MIN_256);
export const MAX_I128: I128 = I128(MAX_128);
export const MIN_I128: I128 = I128(MIN_128);
export const MAX_NUMBER: number = Number.MAX_SAFE_INTEGER;
export const MIN_NUMBER: number = Number.MIN_SAFE_INTEGER;


// #region Math Error Context

export type MathContextIsh =
    | MathPrecisionViolationContext
    | MathPrecisionViolationContext;


export type MathRangeViolationContext = [lower: bigint, upper: bigint, actual: bigint];

export type MathPrecisionViolationContext = {};

// #region Math Error

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
    context: Option<MathContextIsh>
    result: Option<NumberIsh>;
};

export function MathError<T1 extends MathErrorCode>(_this: MathError<T1>): MathError<T1> {
    /** @constructor */ {
        return _this;
    }
}


// #region Generic




// #region I Util








export type _ArithmeticRangeAndPrecisionViolation = "MATH.ERR_UPPER_ARITHMETIC_RANGE_VIOLATION" | "MATH.ERR_LOWER_ARITHMETIC_RANGE_VIOLATION" | "MATH.ERR_PRECISION_VIOLATION";
export type _ArithmeticRangeViolationAndDivisionByZero = "MATH.ERR_UPPER_ARITHMETIC_RANGE_VIOLATION" | "MATH.ERR_LOWER_ARITHMETIC_RANGE_VIOLATION" | "MATH.ERR_DIVISION_BY_ZERO";
export type _ArithmeticRangeViolation = "MATH.ERR_UPPER_ARITHMETIC_RANGE_VIOLATION" | "MATH.ERR_LOWER_ARITHMETIC_RANGE_VIOLATION"; 
export type _UpperArithmeticRangeViolation = "MATH.ERR_UPPER_ARITHMETIC_RANGE_VIOLATION";
export type _LowerArithmeticRangeViolation = "MATH.ERR_LOWER_ARITHMETIC_RANGE_VIOLATION";
export type _PrecisionViolation = "MATH.ERR_PRECISION_VIOLATION";
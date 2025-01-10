import { type Branded } from "@root";
import { type Wrapper } from "@root";
import { Result } from "@root";
import { Option } from "@root";

export type NumberLike = Float | number | bigint | I8 | I16 | I32 | I64 | I128 | I256 | I | U8 | U16 | U32 | U64 | U128 | U256 | U;

export type Float = {

};



export type IRLike<T1 extends ILike<T3>, T2 extends MathErrorCode, T3 extends ILikeBrand = ILikeBrandMap<T1>> = Result<T1, MathError<T2>>;

/// Signed Integer Result Map
export type IRMap<T1 extends ILike<T3>, T2 extends NumberLike, T3 extends ILikeBrand = ILikeBrandMap<T1>> =
    T1 extends I8
        ? T2 extends number  ? IRLike<I8, _ArithmeticRangeAndPrecisionViolation>
        : T2 extends bigint  ? IRLike<I8, _ArithmeticRangeViolation> 
        : T2 extends Float   ? IRLike<I8, _ArithmeticRangeAndPrecisionViolation>
        : T2 extends I8      ? I8
        : T2 extends I16     ? IRLike<I8, _ArithmeticRangeViolation>
        : T2 extends I32     ? IRLike<I8, _ArithmeticRangeViolation>
        : T2 extends I64     ? IRLike<I8, _ArithmeticRangeViolation>
        : T2 extends I128    ? IRLike<I8, _ArithmeticRangeViolation>
        : T2 extends I256    ? IRLike<I8, _ArithmeticRangeViolation>
        : T2 extends I       ? IRLike<I8, _ArithmeticRangeViolation>
        : T2 extends U8      ? I8
        : T2 extends U16     ? IRLike<I8, _UpperArithmeticRangeViolation>
        : T2 extends U32     ? IRLike<I8, _UpperArithmeticRangeViolation>
        : T2 extends U64     ? IRLike<I8, _UpperArithmeticRangeViolation>
        : T2 extends U128    ? IRLike<I8, _UpperArithmeticRangeViolation>
        : T2 extends U256    ? IRLike<I8, _UpperArithmeticRangeViolation>
        : T2 extends U       ? IRLike<I8, _UpperArithmeticRangeViolation> 
        : never :
    T1 extends I16
        ? T2 extends number  ? IRLike<I16, _ArithmeticRangeAndPrecisionViolation>
        : T2 extends bigint  ? IRLike<I16, _ArithmeticRangeViolation>
        : T2 extends Float   ? IRLike<I16, _ArithmeticRangeAndPrecisionViolation>
        : T2 extends I8      ? I16
        : T2 extends I16     ? I16
        : T2 extends I32     ? IRLike<I16, _ArithmeticRangeViolation>
        : T2 extends I64     ? IRLike<I16, _ArithmeticRangeViolation>
        : T2 extends I128    ? IRLike<I16, _ArithmeticRangeViolation>
        : T2 extends I256    ? IRLike<I16, _ArithmeticRangeViolation>
        : T2 extends I       ? IRLike<I16, _ArithmeticRangeViolation>
        : T2 extends U8      ? I16
        : T2 extends U16     ? I16
        : T2 extends U32     ? IRLike<I16, _UpperArithmeticRangeViolation>
        : T2 extends U64     ? IRLike<I16, _UpperArithmeticRangeViolation>
        : T2 extends U128    ? IRLike<I16, _UpperArithmeticRangeViolation>
        : T2 extends U256    ? IRLike<I16, _UpperArithmeticRangeViolation>
        : T2 extends U       ? IRLike<I16, _UpperArithmeticRangeViolation>
        : never :
    T1 extends I32
        ? T2 extends number  ? IRLike<I32, _ArithmeticRangeAndPrecisionViolation>
        : T2 extends bigint  ? IRLike<I32, _ArithmeticRangeViolation>
        : T2 extends Float   ? IRLike<I32, _ArithmeticRangeAndPrecisionViolation>
        : T2 extends I8      ? I32
        : T2 extends I16     ? I32
        : T2 extends I32     ? I32
        : T2 extends I64     ? IRLike<I32, _ArithmeticRangeViolation>
        : T2 extends I128    ? IRLike<I32, _ArithmeticRangeViolation>
        : T2 extends I256    ? IRLike<I32, _ArithmeticRangeViolation>
        : T2 extends I       ? IRLike<I32, _ArithmeticRangeViolation>
        : T2 extends U8      ? I32
        : T2 extends U16     ? I32
        : T2 extends U32     ? I32
        : T2 extends U64     ? IRLike<I32, _UpperArithmeticRangeViolation>
        : T2 extends U128    ? IRLike<I32, _UpperArithmeticRangeViolation>
        : T2 extends U256    ? IRLike<I32, _UpperArithmeticRangeViolation>
        : T2 extends U       ? IRLike<I32, _UpperArithmeticRangeViolation>
        : never :
    T1 extends I64
        ? T2 extends number  ? IRLike<I64, _PrecisionViolation>
        : T2 extends bigint  ? IRLike<I64, _ArithmeticRangeViolation>
        : T2 extends Float   ? IRLike<I64, _PrecisionViolation>
        : T2 extends I8      ? I64
        : T2 extends I16     ? I64
        : T2 extends I32     ? I64
        : T2 extends I64     ? I64
        : T2 extends I128    ? IRLike<I64, _ArithmeticRangeViolation>
        : T2 extends I256    ? IRLike<I64, _ArithmeticRangeViolation>
        : T2 extends I       ? IRLike<I64, _ArithmeticRangeViolation>
        : T2 extends U8      ? I64
        : T2 extends U16     ? I64
        : T2 extends U32     ? I64 
        : T2 extends U64     ? I64
        : T2 extends U128    ? IRLike<I64, _ArithmeticRangeViolation>
        : T2 extends U256    ? IRLike<I64, _ArithmeticRangeViolation>
        : T2 extends U       ? IRLike<I64, _ArithmeticRangeViolation>
        : never :
    T1 extends I128
        ? T2 extends number  ? IRLike<I128, _PrecisionViolation>
        : T2 extends bigint  ? IRLike<I128, _ArithmeticRangeViolation>
        : T2 extends Float   ? IRLike<I128, _PrecisionViolation>
        : T2 extends I8      ? I128
        : T2 extends I16     ? I128
        : T2 extends I32     ? I128
        : T2 extends I64     ? I128
        : T2 extends I128    ? I128
        : T2 extends I256    ? IRLike<I128, _ArithmeticRangeViolation>
        : T2 extends I       ? IRLike<I128, _ArithmeticRangeViolation>
        : T2 extends U8      ? I128
        : T2 extends U16     ? I128
        : T2 extends U32     ? I128
        : T2 extends U64     ? I128
        : T2 extends U128    ? I128
        : T2 extends U256    ? IRLike<I128, _UpperArithmeticRangeViolation>
        : T2 extends U       ? IRLike<I128, _UpperArithmeticRangeViolation>
        : never :
    T1 extends I256
        ? T2 extends number  ? IRLike<I256, _PrecisionViolation>
        : T2 extends bigint  ? IRLike<I256, _ArithmeticRangeViolation>
        : T2 extends Float   ? IRLike<I256, _PrecisionViolation>
        : T2 extends I8      ? I256
        : T2 extends I16     ? I256
        : T2 extends I32     ? I256
        : T2 extends I64     ? I256
        : T2 extends I128    ? I256
        : T2 extends I256    ? I256
        : T2 extends I       ? IRLike<I256, _ArithmeticRangeViolation>
        : T2 extends U8      ? I256
        : T2 extends U16     ? I256
        : T2 extends U32     ? I256
        : T2 extends U64     ? I256
        : T2 extends U128    ? I256
        : T2 extends U256    ? I256
        : T2 extends U       ? IRLike<I256, _ArithmeticRangeViolation>
        : never :
    T1 extends I
        ? T2 extends number  ? IRLike<I, _PrecisionViolation>
        : T2 extends bigint  ? I
        : T2 extends Float   ? IRLike<I, _PrecisionViolation>
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

export type LargestIR<T1 extends ILike<any>, T2 extends ILike<any>, T3 extends MathErrorCode> = Result<LargestI<T1, T2>, MathError<T3>>;

export type LargestI<T1 extends ILike<T3>, T2 extends ILike<T4>, T3 extends ILikeBrand = ILikeBrandMap<T1>, T4 extends ILikeBrand = ILikeBrandMap<T2>> =
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

export type ILikeBrandMap<T1 extends ILike<ILikeBrand>> = 
    T1 extends I8    ? "I8" :
    T1 extends I16   ? "I16" :
    T1 extends I32   ? "I32" :
    T1 extends I64   ? "I64" :
    T1 extends I128  ? "I128" :
    T1 extends I256  ? "I256" :
    T1 extends I     ? "I" :
    never;

export type ILikeBrand = "I8" | "I16" | "I32" | "I64" | "I128" | "I256" | "I";

export type ILike<T1 extends ILikeBrand> = 
    & Branded<T1> 
    & Wrapper<bigint>;


export type I8 = 
    & ILike<"I8">
    & {
    eq<T1 extends ILike<T2>, T2 extends ILikeBrand = ILikeBrandMap<T1>>(x: T1): boolean;
    lt<T1 extends ILike<T2>, T2 extends ILikeBrand = ILikeBrandMap<T1>>(x: T1): boolean;
    gt<T1 extends ILike<T2>, T2 extends ILikeBrand = ILikeBrandMap<T1>>(x: T1): boolean;
    lteq<T1 extends ILike<T2>, T2 extends ILikeBrand = ILikeBrandMap<T1>>(x: T1): boolean;
    gteq<T1 extends ILike<T2>, T2 extends ILikeBrand = ILikeBrandMap<T1>>(x: T1): boolean;
    add<T1 extends ILike<T2>, T2 extends ILikeBrand = ILikeBrandMap<T1>>(x: T1): LargestIR<I8, T1, _UpperArithmeticRangeViolation>;
    sub<T1 extends ILike<T2>, T2 extends ILikeBrand = ILikeBrandMap<T1>>(x: T1): LargestIR<I8, T1, _LowerArithmeticRangeViolation>;
    mul<T1 extends ILike<T2>, T2 extends ILikeBrand = ILikeBrandMap<T1>>(x: T1): LargestIR<I8, T1, _ArithmeticRangeViolation>;
    div<T1 extends ILike<T2>, T2 extends ILikeBrand = ILikeBrandMap<T1>>(x: T1): LargestIR<I8, T1, _ArithmeticRangeViolationAndDivisionByZero>;
};

export type I16 = 
    & ILike<"I16">
    & {
    eq<T1 extends ILike<T2>, T2 extends ILikeBrand = ILikeBrandMap<T1>>(x: T1): boolean;
    lt<T1 extends ILike<T2>, T2 extends ILikeBrand = ILikeBrandMap<T1>>(x: T1): boolean;
    gt<T1 extends ILike<T2>, T2 extends ILikeBrand = ILikeBrandMap<T1>>(x: T1): boolean;
    lteq<T1 extends ILike<T2>, T2 extends ILikeBrand = ILikeBrandMap<T1>>(x: T1): boolean;
    gteq<T1 extends ILike<T2>, T2 extends ILikeBrand = ILikeBrandMap<T1>>(x: T1): boolean;
    add<T1 extends ILike<T2>, T2 extends ILikeBrand = ILikeBrandMap<T1>>(x: T1): LargestIR<I16, T1, _UpperArithmeticRangeViolation>;
    sub<T1 extends ILike<T2>, T2 extends ILikeBrand = ILikeBrandMap<T1>>(x: T1): LargestIR<I16, T1, _LowerArithmeticRangeViolation>;
    mul<T1 extends ILike<T2>, T2 extends ILikeBrand = ILikeBrandMap<T1>>(x: T1): LargestIR<I16, T1, _ArithmeticRangeViolation>;
    div<T1 extends ILike<T2>, T2 extends ILikeBrand = ILikeBrandMap<T1>>(x: T1): LargestIR<I16, T1, _ArithmeticRangeViolationAndDivisionByZero>;
};

export type I32 =
    & ILike<"I32">
    & {
    eq<T1 extends ILike<T2>, T2 extends ILikeBrand = ILikeBrandMap<T1>>(x: T1): boolean;
    lt<T1 extends ILike<T2>, T2 extends ILikeBrand = ILikeBrandMap<T1>>(x: T1): boolean;
    gt<T1 extends ILike<T2>, T2 extends ILikeBrand = ILikeBrandMap<T1>>(x: T1): boolean;
    lteq<T1 extends ILike<T2>, T2 extends ILikeBrand = ILikeBrandMap<T1>>(x: T1): boolean;
    gteq<T1 extends ILike<T2>, T2 extends ILikeBrand = ILikeBrandMap<T1>>(x: T1): boolean;
    add<T1 extends ILike<T2>, T2 extends ILikeBrand = ILikeBrandMap<T1>>(x: T1): LargestIR<I32, T1, _UpperArithmeticRangeViolation>;
    sub<T1 extends ILike<T2>, T2 extends ILikeBrand = ILikeBrandMap<T1>>(x: T1): LargestIR<I32, T1, _LowerArithmeticRangeViolation>;
    mul<T1 extends ILike<T2>, T2 extends ILikeBrand = ILikeBrandMap<T1>>(x: T1): LargestIR<I32, T1, _ArithmeticRangeViolation>;
    div<T1 extends ILike<T2>, T2 extends ILikeBrand = ILikeBrandMap<T1>>(x: T1): LargestIR<I32, T1, _ArithmeticRangeViolationAndDivisionByZero>;
};

export type I64 =
    & ILike<"I64">
    & {
    eq<T1 extends ILike<T2>, T2 extends ILikeBrand = ILikeBrandMap<T1>>(x: T1): boolean;
    lt<T1 extends ILike<T2>, T2 extends ILikeBrand = ILikeBrandMap<T1>>(x: T1): boolean;
    gt<T1 extends ILike<T2>, T2 extends ILikeBrand = ILikeBrandMap<T1>>(x: T1): boolean;
    lteq<T1 extends ILike<T2>, T2 extends ILikeBrand = ILikeBrandMap<T1>>(x: T1): boolean;
    gteq<T1 extends ILike<T2>, T2 extends ILikeBrand = ILikeBrandMap<T1>>(x: T1): boolean;
    add<T1 extends ILike<T2>, T2 extends ILikeBrand = ILikeBrandMap<T1>>(x: T1): LargestIR<I64, T1, _UpperArithmeticRangeViolation>;
    sub<T1 extends ILike<T2>, T2 extends ILikeBrand = ILikeBrandMap<T1>>(x: T1): LargestIR<I64, T1, _LowerArithmeticRangeViolation>;
    mul<T1 extends ILike<T2>, T2 extends ILikeBrand = ILikeBrandMap<T1>>(x: T1): LargestIR<I64, T1, _ArithmeticRangeViolation>;
    div<T1 extends ILike<T2>, T2 extends ILikeBrand = ILikeBrandMap<T1>>(x: T1): LargestIR<I64, T1, _ArithmeticRangeViolationAndDivisionByZero>;
};

export type I128 =
    & ILike<"I128">
    & {
    eq<T1 extends ILike<T2>, T2 extends ILikeBrand = ILikeBrandMap<T1>>(x: T1): boolean;
    lt<T1 extends ILike<T2>, T2 extends ILikeBrand = ILikeBrandMap<T1>>(x: T1): boolean;
    gt<T1 extends ILike<T2>, T2 extends ILikeBrand = ILikeBrandMap<T1>>(x: T1): boolean;
    lteq<T1 extends ILike<T2>, T2 extends ILikeBrand = ILikeBrandMap<T1>>(x: T1): boolean;
    gteq<T1 extends ILike<T2>, T2 extends ILikeBrand = ILikeBrandMap<T1>>(x: T1): boolean;
    add<T1 extends ILike<T2>, T2 extends ILikeBrand = ILikeBrandMap<T1>>(x: T1): LargestIR<I128, T1, _UpperArithmeticRangeViolation>;
    sub<T1 extends ILike<T2>, T2 extends ILikeBrand = ILikeBrandMap<T1>>(x: T1): LargestIR<I128, T1, _LowerArithmeticRangeViolation>;
    mul<T1 extends ILike<T2>, T2 extends ILikeBrand = ILikeBrandMap<T1>>(x: T1): LargestIR<I128, T1, _ArithmeticRangeViolation>;
    div<T1 extends ILike<T2>, T2 extends ILikeBrand = ILikeBrandMap<T1>>(x: T1): LargestIR<I128, T1, _ArithmeticRangeViolationAndDivisionByZero>;
};

export type I256 =
    & ILike<"I256">
    & {
    eq<T1 extends ILike<T2>, T2 extends ILikeBrand = ILikeBrandMap<T1>>(x: T1): boolean;
    lt<T1 extends ILike<T2>, T2 extends ILikeBrand = ILikeBrandMap<T1>>(x: T1): boolean;
    gt<T1 extends ILike<T2>, T2 extends ILikeBrand = ILikeBrandMap<T1>>(x: T1): boolean;
    lteq<T1 extends ILike<T2>, T2 extends ILikeBrand = ILikeBrandMap<T1>>(x: T1): boolean;
    gteq<T1 extends ILike<T2>, T2 extends ILikeBrand = ILikeBrandMap<T1>>(x: T1): boolean;
    add<T1 extends ILike<T2>, T2 extends ILikeBrand = ILikeBrandMap<T1>>(x: T1): LargestIR<I256, T1, _UpperArithmeticRangeViolation>;
    sub<T1 extends ILike<T2>, T2 extends ILikeBrand = ILikeBrandMap<T1>>(x: T1): LargestIR<I256, T1, _LowerArithmeticRangeViolation>;
    mul<T1 extends ILike<T2>, T2 extends ILikeBrand = ILikeBrandMap<T1>>(x: T1): LargestIR<I256, T1, _ArithmeticRangeViolation>;
    div<T1 extends ILike<T2>, T2 extends ILikeBrand = ILikeBrandMap<T1>>(x: T1): LargestIR<I256, T1, _ArithmeticRangeViolationAndDivisionByZero>;
};

export type I =
    & ILike<"I">
    & {
    eq<T1 extends ILike<T2>, T2 extends ILikeBrand = ILikeBrandMap<T1>>(x: T1): boolean;
    lt<T1 extends ILike<T2>, T2 extends ILikeBrand = ILikeBrandMap<T1>>(x: T1): boolean;
    gt<T1 extends ILike<T2>, T2 extends ILikeBrand = ILikeBrandMap<T1>>(x: T1): boolean;
    lteq<T1 extends ILike<T2>, T2 extends ILikeBrand = ILikeBrandMap<T1>>(x: T1): boolean;
    gteq<T1 extends ILike<T2>, T2 extends ILikeBrand = ILikeBrandMap<T1>>(x: T1): boolean;
    add<T1 extends ILike<T2>, T2 extends ILikeBrand = ILikeBrandMap<T1>>(x: T1): LargestIR<I, T1, _UpperArithmeticRangeViolation>;
    sub<T1 extends ILike<T2>, T2 extends ILikeBrand = ILikeBrandMap<T1>>(x: T1): LargestIR<I, T1, _LowerArithmeticRangeViolation>;
    mul<T1 extends ILike<T2>, T2 extends ILikeBrand = ILikeBrandMap<T1>>(x: T1): LargestIR<I, T1, _ArithmeticRangeViolation>;
    div<T1 extends ILike<T2>, T2 extends ILikeBrand = ILikeBrandMap<T1>>(x: T1): LargestIR<I, T1, _ArithmeticRangeViolationAndDivisionByZero>;
};

export function I8<T1 extends NumberLike>(_x: NumberLike): IRMap<I8, T1> {}

export function I16<T1 extends NumberLike>(_x: NumberLike): IRMap<I16, T1> {}

export function I32<T1 extends NumberLike>(_x: NumberLike): IRMap<I32, T1> {}

export function I64<T1 extends NumberLike>(_x: NumberLike): IRMap<I64, T1> {}

export function I128<T1 extends NumberLike>(_x: NumberLike): IRMap<I128, T1> {}

export function I256<T1 extends NumberLike>(_x: NumberLike): IRMap<I256, T1> {}

export function I<T1 extends NumberLike>(_x: NumberLike): IRMap<I, T1> {}


export type URLike<T1 extends ULike<T3>, T2 extends MathErrorCode, T3 extends ULikeBrand = ULikeBrandMap<T1>> = Result<T1, MathError<T2>>;

export type URMap<T1 extends ULike<T3>, T2 extends NumberLike, T3 extends ULikeBrand = ULikeBrandMap<T1>> =
    T1 extends U8
        ? T2 extends number  ? URLike<U8, _ArithmeticRangeAndPrecisionViolation>
        : T2 extends bigint  ? URLike<U8, _ArithmeticRangeViolation>
        : T2 extends Float   ? URLike<U8, _ArithmeticRangeAndPrecisionViolation>
        : T2 extends I8      ? URLike<U8, _LowerArithmeticRangeViolation>
        : T2 extends I16     ? URLike<U8, _ArithmeticRangeViolation>
        : T2 extends I32     ? URLike<U8, _ArithmeticRangeViolation>
        : T2 extends I64     ? URLike<U8, _ArithmeticRangeViolation>
        : T2 extends I128    ? URLike<U8, _ArithmeticRangeViolation>
        : T2 extends I256    ? URLike<U8, _ArithmeticRangeViolation>
        : T2 extends I       ? URLike<U8, _ArithmeticRangeViolation>
        : T2 extends U8      ? U8
        : T2 extends U16     ? URLike<U8, _UpperArithmeticRangeViolation>
        : T2 extends U32     ? URLike<U8, _UpperArithmeticRangeViolation>
        : T2 extends U64     ? URLike<U8, _UpperArithmeticRangeViolation>
        : T2 extends U128    ? URLike<U8, _UpperArithmeticRangeViolation>
        : T2 extends U256    ? URLike<U8, _UpperArithmeticRangeViolation>
        : T2 extends U       ? URLike<U8, _UpperArithmeticRangeViolation>
        : never :
    T1 extends U16
        ? T2 extends number  ? URLike<U16, _ArithmeticRangeAndPrecisionViolation>
        : T2 extends bigint  ? URLike<U16, _ArithmeticRangeViolation>
        : T2 extends Float   ? URLike<U16, _ArithmeticRangeAndPrecisionViolation>
        : T2 extends I8      ? URLike<U16, _LowerArithmeticRangeViolation>
        : T2 extends I16     ? URLike<U16, _LowerArithmeticRangeViolation>
        : T2 extends I32     ? URLike<U16, _ArithmeticRangeViolation>
        : T2 extends I64     ? URLike<U16, _ArithmeticRangeViolation>
        : T2 extends I128    ? URLike<U16, _ArithmeticRangeViolation>
        : T2 extends I256    ? URLike<U16, _ArithmeticRangeViolation>
        : T2 extends I       ? URLike<U16, _ArithmeticRangeViolation>
        
        ;

export type LargestUR<T1 extends ULike<any>, T2 extends ULike<any>, T3 extends MathErrorCode> = Result<LargestU<T1, T2>, MathError<T3>>;

export type LargestU<T1 extends ULike<T3>, T2 extends ULike<T4>, T3 extends ULikeBrand = ULikeBrandMap<T1>, T4 extends ULikeBrand = ULikeBrandMap<T2>> =
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

export type ULikeBrandMap<T1 extends ULike<ULikeBrand>> =
    T1 extends U8    ? "U8" :
    T1 extends U16   ? "U16" :
    T1 extends U32   ? "U32" :
    T1 extends U64   ? "U64" :
    T1 extends U128  ? "U128" :
    T1 extends U256  ? "U256" :
    T1 extends U     ? "U" :
    never;

export type ULikeBrand = "U8" | "U16" | "U32" | "U64" | "U128" | "U256" | "U";

export type ULike<T1 extends ULikeBrand> =
    & Branded<T1>
    & Wrapper<bigint>;

export type U8 =
    & ULike<"U8"> 
    & {

};



    











































export type UIshBrand = "U8" | "U16" | "U32" | "U64" | "U128" | "U256" | "U";

export type UIsh<T1 extends UIshBrand> =
    & Branded<T1>
    & Wrapper<bigint>
    & {};


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
export const MAX_I256: I256 = I256(MAX_256).unwrap();
export const MIN_I256: I256 = I256(MIN_256).unwrap();
export const MAX_I128: I128 = I128(MAX_128).unwrap();
export const MIN_I128: I128 = I128(MIN_128).unwrap();
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
    result: Option<NumberLike>;
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
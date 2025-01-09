import { type Branded } from "@root";
import { type Wrapper } from "@root";
import { Result } from "@root";
import { Option } from "@root";


export type Float = {

};

export type IIshBrand = "I8" | "I16" | "I32" | "I64" | "I128" | "I256" | "I";

export type IIsh<T1 extends IIshBrand> = 
    & Branded<T1>
    & Wrapper<bigint>
    & {
    
}


/**
 * @title IRIsh Type Alias
 * @notice A generic type alias that represents the result of a mathematical operation, associating it with potential error codes.
 *
 * @dev
 * The `IRIsh` type provides a structured way to pair the result of an operation (`Result<T1>`)
 * with a specific error type (`MathError<T2>`), enabling type-safe error handling for numerical operations.
 *
 * @typeParam T1 - The main result type derived from `IIsh<T3>`, representing the successful outcome of a computation.
 * @typeParam T2 - The type of math error code, derived from `MathErrorCode`, identifying specific errors that might occur.
 * @typeParam T3 - An optional brand type for differentiating between similar `IIsh` instances, defaults to `IIshBrandMap<T1>`.
 *
 * @return
 * Combines `T1` as the result of a computation and an associated `MathError<T2>` to represent specific failure scenarios.
 *
 * @example
 * ```typescript
 * // Example Usage: Result of computation with error handling
 * type CalculationResult = IRIsh<I8, "MATH.ERR_PRECISION_VIOLATION">;
 * ```
 */
export type IRIsh<T1 extends IIsh<T3>, T2 extends MathErrorCode, T3 extends IIshBrand = IIshBrandMap<T1>> = Result<T1, MathError<T2>>;


export type IRMap<T1 extends IIsh<T3>, T2 extends NumberIsh, T3 extends IIshBrand = IIshBrandMap<T1>> =
    T1 extends I8
        ? T2 extends number  ? IRIsh<I8, "MATH.ERR_UPPER_ARITHMETIC_RANGE_VIOLATION" | "MATH.ERR_LOWER_ARITHMETIC_RANGE_VIOLATION" | "MATH.ERR_PRECISION_VIOLATION">
        : T2 extends bigint  ? IRIsh<I8, "MATH.ERR_UPPER_ARITHMETIC_RANGE_VIOLATION" | "MATH.ERR_LOWER_ARITHMETIC_RANGE_VIOLATION"> 
        : T2 extends Float   ? IRIsh<I8, "MATH.ERR_UPPER_ARITHMETIC_RANGE_VIOLATION" | "MATH.ERR_LOWER_ARITHMETIC_RANGE_VIOLATION" | "MATH.ERR_PRECISION_VIOLATION">
        : T2 extends I8      ? I8
        : T2 extends I16     ? IRIsh<I8, "MATH.ERR_UPPER_ARITHMETIC_RANGE_VIOLATION" | "MATH.ERR_LOWER_ARITHMETIC_RANGE_VIOLATION">
        : T2 extends I32     ? IRIsh<I8, "MATH.ERR_UPPER_ARITHMETIC_RANGE_VIOLATION" | "MATH.ERR_LOWER_ARITHMETIC_RANGE_VIOLATION">
        : T2 extends I64     ? IRIsh<I8, "MATH.ERR_UPPER_ARITHMETIC_RANGE_VIOLATION" | "MATH.ERR_LOWER_ARITHMETIC_RANGE_VIOLATION">
        : T2 extends I128    ? IRIsh<I8, "MATH.ERR_UPPER_ARITHMETIC_RANGE_VIOLATION" | "MATH.ERR_LOWER_ARITHMETIC_RANGE_VIOLATION">
        : T2 extends I256    ? IRIsh<I8, "MATH.ERR_UPPER_ARITHMETIC_RANGE_VIOLATION" | "MATH.ERR_LOWER_ARITHMETIC_RANGE_VIOLATION">
        : T2 extends I       ? IRIsh<I8, "MATH.ERR_UPPER_ARITHMETIC_RANGE_VIOLATION" | "MATH.ERR_LOWER_ARITHMETIC_RANGE_VIOLATION">
        : T2 extends U8      ? I8
        : T2 extends U16     ? IRIsh<I8, "MATH.ERR_UPPER_ARITHMETIC_RANGE_VIOLATION">
        : T2 extends U32     ? IRIsh<I8, "MATH.ERR_UPPER_ARITHMETIC_RANGE_VIOLATION">
        : T2 extends U64     ? IRIsh<I8, "MATH.ERR_UPPER_ARITHMETIC_RANGE_VIOLATION">
        : T2 extends U128    ? IRIsh<I8, "MATH.ERR_UPPER_ARITHMETIC_RANGE_VIOLATION">
        : T2 extends U256    ? IRIsh<I8, "MATH.ERR_UPPER_ARITHMETIC_RANGE_VIOLATION">
        : T2 extends U       ? IRIsh<I8, "MATH.ERR_UPPER_ARITHMETIC_RANGE_VIOLATION"> 
        : never :
    T1 extends I16
        ? T2 extends number  ? IRIsh<I16, "MATH.ERR_UPPER_ARITHMETIC_RANGE_VIOLATION" | "MATH.ERR_LOWER_ARITHMETIC_RANGE_VIOLATION" | "MATH.ERR_PRECISION_VIOLATION">
        : T2 extends bigint  ? IRIsh<I16, "MATH.ERR_UPPER_ARITHMETIC_RANGE_VIOLATION" | "MATH.ERR_LOWER_ARITHMETIC_RANGE_VIOLATION">
        : T2 extends Float   ? IRIsh<I16, "MATH.ERR_UPPER_ARITHMETIC_RANGE_VIOLATION" | "MATH.ERR_LOWER_ARITHMETIC_RANGE_VIOLATION" | "MATH.ERR_PRECISION_VIOLATION">
        : T2 extends I8      ? I16
        : T2 extends I16     ? I16
        : T2 extends I32     ? IRIsh<I16, "MATH.ERR_UPPER_ARITHMETIC_RANGE_VIOLATION" | "MATH.ERR_LOWER_ARITHMETIC_RANGE_VIOLATION">
        : T2 extends I64     ? IRIsh<I16, "MATH.ERR_UPPER_ARITHMETIC_RANGE_VIOLATION" | "MATH.ERR_LOWER_ARITHMETIC_RANGE_VIOLATION">
        : T2 extends I128    ? IRIsh<I16, "MATH.ERR_UPPER_ARITHMETIC_RANGE_VIOLATION" | "MATH.ERR_LOWER_ARITHMETIC_RANGE_VIOLATION">
        : T2 extends I256    ? IRIsh<I16, "MATH.ERR_UPPER_ARITHMETIC_RANGE_VIOLATION" | "MATH.ERR_LOWER_ARITHMETIC_RANGE_VIOLATION">
        : T2 extends I       ? IRIsh<I16, "MATH.ERR_UPPER_ARITHMETIC_RANGE_VIOLATION" | "MATH.ERR_LOWER_ARITHMETIC_RANGE_VIOLATION">
        : T2 extends U8      ? I16
        : T2 extends U16     ? I16
        : T2 extends U32     ? IRIsh<I16, "MATH.ERR_UPPER_ARITHMETIC_RANGE_VIOLATION">
        : T2 extends U64     ? IRIsh<I16, "MATH.ERR_UPPER_ARITHMETIC_RANGE_VIOLATION">
        : T2 extends U128    ? IRIsh<I16, "MATH.ERR_UPPER_ARITHMETIC_RANGE_VIOLATION">
        : T2 extends U256    ? IRIsh<I16, "MATH.ERR_UPPER_ARITHMETIC_RANGE_VIOLATION">
        : T2 extends U       ? IRIsh<I16, "MATH.ERR_UPPER_ARITHMETIC_RANGE_VIOLATION">


                ? IRIsh<I16, "MATH.ERR_UPPER_ARITHMETIC_RANGE_VIOLATION" | "MATH.ERR_LOWER_ARITHMETIC_RANGE_VIOLATION">
                : T2 extends bigint
                    ? IRIsh<I16, "MATH.ERR_BIGINT_NOT_SUPPORTED">
                    : never
            : never;
    


export type I8RMap<T1 extends NumberIsh> =
    T1 extends number ? IRIsh<I8, "MATH.ERR_UPPER_ARITHMETIC_RANGE_VIOLATION" | "MATH.ERR_LOWER_ARITHMETIC_RANGE_VIOLATION" | "MATH.ERR_PRECISION_VIOLATION"> :
    T1 extends bigint ? IRIsh<I8, "MATH.ERR_UPPER_ARITHMETIC_RANGE_VIOLATION" | "MATH.ERR_LOWER_ARITHMETIC_RANGE_VIOLATION"> :
    T1 extends I16 ? IRIsh<I8, "MATH.ERR_UPPER_ARITHMETIC_RANGE_VIOLATION" | "MATH.ERR_LOWER_ARITHMETIC_RANGE_VIOLATION"> :
    T1 extends I32 ? IRIsh<I8, "MATH.ERR_UPPER_ARITHMETIC_RANGE_VIOLATION" | "MATH.ERR_LOWER_ARITHMETIC_RANGE_VIOLATION"> :
    T1 extends I64 ? IRIsh<I8, "MATH.ERR_UPPER_ARITHMETIC_RANGE_VIOLATION" | "MATH.ERR_LOWER_ARITHMETIC_RANGE_VIOLATION"> :
    T1 extends I128 ? IRIsh<I8, "MATH.ERR_UPPER_ARITHMETIC_RANGE_VIOLATION" | "MATH.ERR_LOWER_ARITHMETIC_RANGE_VIOLATION"> :
    T1 extends I256 ? IRIsh<I8, "MATH.ERR_UPPER_ARITHMETIC_RANGE_VIOLATION" | "MATH.ERR_LOWER_ARITHMETIC_RANGE_VIOLATION"> :
    T1 extends I ? IRIsh<I8, "MATH.ERR_UPPER_ARITHMETIC_RANGE_VIOLATION" | "MATH.ERR_LOWER_ARITHMETIC_RANGE_VIOLATION"> :
    ;



export type I8Compatible = I8 | U8;
export type I8R<T1 extends MathErrorCode> = Result<I8, MathError<T1>>;
export type I8 = IIsh<"I8">;
export type I8ArithmeticRangeViolationR = I8R<"MATH.ERR_UPPER_ARITHMETIC_RANGE_VIOLATION" | "MATH.ERR_LOWER_ARITHMETIC_RANGE_VIOLATION">;
export type I8ArithmeticRangeViolation = bigint | I16 | I32 | I64 | I128 | I256 | I;
export type I8UpperArithmeticRangeViolationR = I8R<"MATH.ERR_UPPER_ARITHMETIC_RANGE_VIOLATION">;
export type I8UpperArithmeticRangeViolation = U16 | U32 | U64 | U128 | U256 | U;
export type I8ArithmeticRangeAndPrecisionViolationR = I8R<"MATH.ERR_UPPER_ARITHMETIC_RANGE_VIOLATION" | "MATH.ERR_LOWER_ARITHMETIC_RANGE_VIOLATION" | "MATH.ERR_PRECISION_VIOLATION">;
export type I8ArithmeticRangeAndPrecisionViolation = number | Float;

export type I16Compatible = I8 | I16 | U8 | U16;
export type I16R<T1 extends MathErrorCode> = Result<I16, MathError<T1>>;
export type I16 = IIsh<"I16">;
export type I16ArithmeticRangeViolationR = I16R<"MATH.ERR_UPPER_ARITHMETIC_RANGE_VIOLATION" | "MATH.ERR_LOWER_ARITHMETIC_RANGE_VIOLATION">;
export type I16ArithmeticRangeViolation = bigint | I32 | I64 | I128 | I256;
export type I16UpperArithmeticRangeViolationR = I16R<"MATH.ERR_UPPER_ARITHMETIC_RANGE_VIOLATION">;
export type I16UpperArithmeticRangeViolation = U32 | U64 | U128 | U256;

export type I32R<T1 extends MathErrorCode> = Result<I32, MathError<T1>>;
export type I64R<T1 extends MathErrorCode> = Result<I64, MathError<T1>>;
export type I128R<T1 extends MathErrorCode> = Result<I128, MathError<T1>>;
export type I256R<T1 extends MathErrorCode> = Result<I256, MathError<T1>>;



export type I32 = IIsh<"I32">;
export type I64 = IIsh<"I64">;
export type I128 = IIsh<"I128">;
export type I256 = IIsh<"I256">;
export type I = IIsh<"I">;




export type UIshBrand = "U8" | "U16" | "U32" | "U64" | "U128" | "U256" | "U";

export type UIsh<T1 extends UIshBrand> =
    & Branded<T1>
    & Wrapper<bigint>
    & {};

export type U8 = UIsh<"U8">;
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

export type MathRangeViolationContext = [lower: bigint, upper: bigint, actual: bigint];


// #region Math Error

export type MathErrorCode = 
    | "MATH.ERR_UPPER_ARITHMETIC_RANGE_VIOLATION"
    | "MATH.ERR_LOWER_ARITHMETIC_RANGE_VIOLATION"
    | "MATH.ERR_UPPER_RANGE_VIOLATION"
    | "MATH.ERR_LOWER_RANGE_VIOLATION"
    | "MATH.ERR_PRECISION_VIOLATION";

export type MathError<T1 extends MathErrorCode> = {
    code: T1;
    message: Option<string>;
    context: Option<MathRangeViolationContext>
    result: Option<NumberIsh>;
};

export function MathError<T1 extends MathErrorCode>(_this: MathError<T1>): MathError<T1> {
    /** @constructor */ {
        return _this;
    }
}


// #region Generic

export type NumberIsh = number | bigint | I;


// #region I Util

export type IIshBrandMap<T1 extends IIsh<IIshBrand>> = 
    T1 extends I8 ? "I8" :
    T1 extends I16 ? "I16" :
    T1 extends I32 ? "I32" :
    T1 extends I64 ? "I64" :
    T1 extends I128 ? "I128" :
    T1 extends I256 ? "I256" :
    T1 extends I ? "I" :
    never;


export type IGreaterThanOrEqual<T1 extends IIsh<T3>, T2 extends IIsh<T4>, T3 extends IIshBrand = IIshBrandMap<T1>, T4 extends IIshBrand = IIshBrandMap<T2>> = 
    [T3] extends [T4] ? true : 
    T3 extends "I" ? true :
    T4 extends "I" ? false :
    T3 extends "I256" ? true :
    T4 extends "I256" ? false :
    T3 extends "I128" ? true :
    T4 extends "I128" ? false :
    T3 extends "I64" ? true :
    T4 extends "I64" ? false :
    T3 extends "I32" ? true :
    T4 extends "I32" ? false :
    T3 extends "I16" ? true :
    T4 extends "I16" ? false :
    T3 extends "I8" ? true :
    T4 extends "I8" ? false :
    false;

// #region I






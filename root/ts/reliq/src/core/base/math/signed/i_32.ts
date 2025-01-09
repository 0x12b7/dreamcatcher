import * as Root from "@root";

export type I32OverfUnderLossR = I32R<"MATH.ERR_ARITHMETIC_OVERFLOW" | "MATH.ERR_ARITHMETIC_UNDERFLOW" | "MATH.ERR_PRECISION_LOSS">;
export type I32OverfUnderR = I32R<"MATH.ERR_ARITHMETIC_OVERFLOW" | "MATH.ERR_ARITHMETIC_UNDERFLOW">;
export type I32OverfR = I32R<"MATH.ERR_ARITHMETIC_OVERFLOW">;

export type I32Compatible = Root.I8 | Root.I16 | Root.I32 | Root.U8 | Root.U16 | Root.U32;
export type I32OverfUnderLoss = Root.Float | number;
export type I32OverfUnder = Root.I64 | Root.I128 | Root.I256 | Root.I;
export type I32Overf = Root.U64 | Root.U128 | Root.U256 | Root.U;

export type I32R<T1 extends Root.MathErrorCode> = Root.Result<I32, Root.MathError<T1>>;

export type I32 =
    & Root.Branded<"I32">
    & Root.Wrapper<bigint>;

export function I32(_n: I32Compatible): I32;
export function I32(_n: I32OverfUnderLoss): I32OverfUnderLossR;
export function I32(_n: I32OverfUnder): I32OverfUnder;
export function I32(_n: I32Overf): I32Overf;
export function I32(
    _args0: Root.NumberLike
): I32 | I32OverfR | I32OverfUnderR | I32OverfUnderLossR {
    
}
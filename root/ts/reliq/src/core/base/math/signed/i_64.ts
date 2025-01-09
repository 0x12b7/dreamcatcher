import { type Branded } from "@root";
import { type Wrapper } from "@root";
import { type LargestI } from "@root";
import { type LargestU } from "@root";
import { type ILike } from "@root";
import { type ULike } from "@root";
import { type NumberLike } from "@root";
import { type MathErrorCode } from "@root";
import { MathError } from "@root";
import { Result } from "@root";
import { Float } from "@root";
import { I } from "@root";
import { I8 } from "@root";
import { I16 } from "@root";
import { I32 } from "@root";
import { I128 } from "@root";
import { I256 } from "@root";
import { U } from "@root";
import { U8 } from "@root";
import { U16 } from "@root";
import { U32 } from "@root";
import { U64 } from "@root";
import { U128 } from "@root";
import { U256 } from "@root";

export type I64RIMap<T1 extends I | I8> =
    LargestU<U64, T1> extends U64 
        ? I64 
        : 
        | I64R<"MATH.ERR_ARITHMETIC_OVERFLOW">;

let x: I64RIMap<I8> /// should be I64 but x is any



export type I64Compatible = I8 | I16 | I32 | I64 | U8 | U16 | U32 | U64;
export type I64OverfUnderLossR = I64R<"MATH.ERR_ARITHMETIC_OVERFLOW" | "MATH.ERR_ARITHMETIC_UNDERFLOW" | "MATH.ERR_PRECISION_LOSS">;
export type I64OverfUnderLoss = number;
export type I64OverfUnderR = I64R<"MATH.ERR_ARITHMETIC_OVERFLOW" | "MATH.ERR_ARITHMETIC_UNDERFLOW">;
export type I64OverfUnder = I128 | I256 | I;
export type I64OverfR = I64R<"MATH.ERR_ARITHMETIC_OVERFLOW">;
export type I64Overf = U128 | U256 | U;
export type I64LossR = I64R<"MATH.ERR_PRECISION_LOSS">;
export type I64Loss = Float;

export type I64R<T1 extends MathErrorCode> = Result<I64, MathError<T1>>;

export type I64 =
    & Branded<"I64">
    & Wrapper<bigint>;

export function I64(_n: I64Compatible): I64;
export function I64(_n: I64OverfUnderLoss): I64OverfUnderLossR;
export function I64(_n: I64OverfUnder): I64OverfUnderR;
export function I64(_n: I64Overf): I64OverfR;
export function I64(_n: I64Loss): I64LossR;
export function I64(
    _args0: NumberLike
): 
    | I64 
    | I64LossR 
    | I64OverfR 
    | I64OverfUnderR 
    | I64OverfUnderLossR {
    
}
import type { Branded } from "@root";
import type { Wrapper } from "@root";
import { type NumberLike } from "@root";
import { type MathErrorCode } from "@root";
import { MathError } from "@root";
import { Result } from "@root";
import { Float } from "@root";
import { I } from "@root";
import { I8 } from "@root";
import { I32 } from "@root";
import { I64 } from "@root";
import { I128 } from "@root";
import { I256 } from "@root";
import { U } from "@root";
import { U8 } from "@root";
import { U16 } from "@root";
import { U32 } from "@root";
import { U64 } from "@root";
import { U128 } from "@root";
import { U256 } from "@root";

export type I16OverfUnderLossR = I16R<"MATH.ERR_ARITHMETIC_OVERFLOW" | "MATH.ERR_ARITHMETIC_UNDERFLOW" | "MATH.ERR_PRECISION_LOSS">;
export type I16OverfUnderR = I16R<"MATH.ERR_ARITHMETIC_OVERFLOW" | "MATH.ERR_ARITHMETIC_UNDERFLOW">;
export type I16OverfR = I16R<"MATH.ERR_ARITHMETIC_OVERFLOW">;

export type I16Compatible = I8 | I16 | U8 | U16 | bigint;
export type I16OverfUnderLoss = Float | number;
export type I16OverfUnder = I32 | I64 | I128 | I256 | I;
export type I16Overf = U32 | U64 | U128 | U256 | U;

export type I16R<T1 extends MathErrorCode> = Result<I16, MathError<T1>>;

export type I16 =
    & Branded<"I16">
    & Wrapper<bigint>;

export function I16(_n: I16Compatible): I16;
export function I16(_n: I16OverfUnderLoss): I16OverfUnderLossR
export function I16(_n: I16OverfUnder): I16OverfUnderR;
export function I16(_n: I16Overf): I16OverfR;
export function I16(
    _args0: NumberLike
): 
    | I16
    | I16OverfUnderLossR
    | I16OverfUnderR
    | I16OverfR {
    
}
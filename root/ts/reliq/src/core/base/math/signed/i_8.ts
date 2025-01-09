import { type Branded } from "@root";
import { type Wrapper } from "@root";
import { type NumberLike } from "@root";
import { type MathErrorCode } from "@root";
import { MathError } from "@root";
import { Result } from "@root";
import { Float } from "@root";
import { I } from "@root";
import { I16 } from "@root";
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

export type I8R<T1 extends MathErrorCode> = Result<I8, MathError<T1>>;

export type I8 =
    & Branded<"I8">
    & Wrapper<bigint>;

export function I8(_n: Float): I8R<"MATH.ERR_ARITHMETIC_OVERFLOW" | "MATH.ERR_ARITHMETIC_UNDERFLOW" | "MATH.ERR_PRECISION_LOSS">;
export function I8(_n: I): I8R<"MATH.ERR_ARITHMETIC_OVERFLOW" | "MATH.ERR_ARITHMETIC_UNDERFLOW">;
export function I8(_n: I8): I8;
export function I8(_n: I16): I8R<"MATH.ERR_ARITHMETIC_OVERFLOW" | "MATH.ERR_ARITHMETIC_UNDERFLOW">;
export function I8(_n: I32): I8R<"MATH.ERR_ARITHMETIC_OVERFLOW" | "MATH.ERR_ARITHMETIC_UNDERFLOW">;
export function I8(_n: I64): I8R<"MATH.ERR_ARITHMETIC_OVERFLOW" | "MATH.ERR_ARITHMETIC_UNDERFLOW">;
export function I8(_n: I128): I8R<"MATH.ERR_ARITHMETIC_OVERFLOW" | "MATH.ERR_ARITHMETIC_UNDERFLOW">;
export function I8(_n: I256): I8R<"MATH.ERR_ARITHMETIC_OVERFLOW" | "MATH.ERR_ARITHMETIC_UNDERFLOW">;
export function I8(_n: U): I8R<"MATH.ERR_ARITHMETIC_OVERFLOW">;
export function I8(_n: U8): I8;
export function I8(_n: U16): I8R<"MATH.ERR_ARITHMETIC_OVERFLOW">;
export function I8(_n: U32): I8R<"MATH.ERR_ARITHMETIC_OVERFLOW">;
export function I8(_n: U64): I8R<"MATH.ERR_ARITHMETIC_OVERFLOW">;
export function I8(_n: U128): I8R<"MATH.ERR_ARITHMETIC_OVERFLOW">;
export function I8(_n: U256): I8R<"MATH.ERR_ARITHMETIC_OVERFLOW">;
export function I8(_n: number): I8R<"MATH.ERR_ARITHMETIC_OVERFLOW" | "MATH.ERR_ARITHMETIC_UNDERFLOW" | "MATH.ERR_PRECISION_LOSS">;
export function I8(_n: bigint): I8R<"MATH.ERR_ARITHMETIC_OVERFLOW" | "MATH.ERR_ARITHMETIC_UNDERFLOW">;
export function I8(
    _args0: NumberLike
):
    | I8
    | I8R<"MATH.ERR_ARITHMETIC_OVERFLOW">
    | I8R<"MATH.ERR_ARITHMETIC_OVERFLOW" | "MATH.ERR_ARITHMETIC_UNDERFLOW">
    | I8R<"MATH.ERR_ARITHMETIC_OVERFLOW" | "MATH.ERR_ARITHMETIC_UNDERFLOW" | "MATH.ERR_PRECISION_LOSS"> {
    
}
import { Result, type Branded } from "@root";
import { type Wrapper } from "@root";
import { type NumberLike } from "@root";
import { type MathErrorCode } from "@root";
import { MathError } from "@root";
import { Float } from "@root";
import { I8 } from "@root";
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

export type ILossR = IR<"MATH.ERR_PRECISION_LOSS">;
export type ILoss = Float | number;

export type IR<T1 extends MathErrorCode> = Result<I, MathError<T1>>;

export type I = 
    & Branded<"I">
    & Wrapper<bigint>;

export function I(_n: Float): I;
export function I(_n: I): I;
export function I(_n: I8): I;
export function I(_n: I16): I;
export function I(_n: I32): I;
export function I(_n: I64): I;
export function I(_n: I128): I;
export function I(_n: I256): I;
export function I(_n: U): I;
export function I(_n: U8): I;
export function I(_n: U16): I;
export function I(_n: U32): I;
export function I(_n: U64): I;
export function I(_n: U128): I;
export function I(_n: U256): I;
export function I(_n: number): I;
export function I(_n: bigint): I;
export function I(
    _args0: NumberLike
): I {

}
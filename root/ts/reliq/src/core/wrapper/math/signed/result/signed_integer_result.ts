import {
    type SignedInteger,
    type Result,
    type MathError,
    type MathErrorCode
} from "@root";

export type SignedIntegerResult<T1 extends SignedInteger, T2 extends MathErrorCode> = Result<T1, MathError<T2>>;
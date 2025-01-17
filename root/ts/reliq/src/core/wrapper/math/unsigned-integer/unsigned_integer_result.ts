import {
    type UnsignedInteger,
    type Result,
    type MathError,
    type MathErrorCode
} from "@root";

export type UnsignedIntegerResult<T1 extends UnsignedInteger, T2 extends MathErrorCode> = Result<T1, MathError<T2>>;
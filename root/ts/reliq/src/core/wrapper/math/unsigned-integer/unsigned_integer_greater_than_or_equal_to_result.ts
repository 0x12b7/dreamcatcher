import {
    type UnsignedIntegerGreaterThanOrEqualTo,
    type UnsignedInteger,
    type Result,
    type MathErrorCode,
    type MathError
} from "@root";

export type UnsignedIntegerGreaterThanOrEqualToResult<T1 extends UnsignedInteger, T2 extends UnsignedInteger, T3 extends MathErrorCode> = Result<UnsignedIntegerGreaterThanOrEqualTo<T1, T2>, MathError<T3>>;
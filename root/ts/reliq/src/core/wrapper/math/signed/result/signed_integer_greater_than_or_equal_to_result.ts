import {
    type SignedIntegerGreaterThanOrEqualTo,
    type SignedInteger,
    type Result,
    type MathErrorCode,
    type MathError
} from "@root";

export type SignedIntegerGreaterThanOrEqualToResult<T1 extends SignedInteger, T2 extends SignedInteger, T3 extends MathErrorCode> = Result<SignedIntegerGreaterThanOrEqualTo<T1, T2>, MathError<T3>>;
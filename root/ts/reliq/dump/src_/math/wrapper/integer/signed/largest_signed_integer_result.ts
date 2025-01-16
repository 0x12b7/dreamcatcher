import {
    type SignedInteger,
    type LargestSignedInteger,
    type MathErrorCode,
    type MathError,
    type Result
} from "@root";

type LargestSignedIntegerResult<T1 extends SignedInteger, T2 extends SignedInteger, T3 extends MathErrorCode> = Result<LargestSignedInteger<T1, T2>, MathError<T3>>;

export type { LargestSignedIntegerResult };
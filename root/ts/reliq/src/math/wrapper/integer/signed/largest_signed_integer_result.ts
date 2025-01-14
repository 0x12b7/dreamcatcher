import type { SignedInteger } from "@root";
import type { LargestSignedInteger } from "@root";
import type { Result } from "@root";
import type { MathErrorCode } from "@root";
import type { MathError } from "@root";

type LargestSignedIntegerResult<T1 extends SignedInteger, T2 extends SignedInteger, T3 extends MathErrorCode> = Result<LargestSignedInteger<T1, T2>, MathError<T3>>;

export type { LargestSignedIntegerResult };
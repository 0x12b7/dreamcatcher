import type { SignedInteger } from "@root";
import type { MathErrorCode } from "@root";
import type { MathError } from "@root";
import type { Result } from "@root";

type SignedIntegerResult<T1 extends SignedInteger, T2 extends MathErrorCode> = Result<T1, MathError<T2>>;

export type { SignedIntegerResult };
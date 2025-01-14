import type { UnsignedInteger } from "@root";
import type { LargestUnsignedInteger } from "@root";
import type { Result } from "@root";
import type { MathErrorCode } from "@root";
import type { MathError } from "@root";

type LargestUnsignedIntegerResult<T1 extends UnsignedInteger, T2 extends UnsignedInteger, T3 extends MathErrorCode> = Result<LargestUnsignedInteger<T1, T2>, MathError<T3>>;

export type { LargestUnsignedIntegerResult };
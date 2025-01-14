import type { UnsignedInteger } from "@root";
import type { MathErrorCode } from "@root";
import type { MathError } from "@root";
import type { Result } from "@root";

type UnsignedIntegerResult<T1 extends UnsignedInteger, T2 extends MathErrorCode> = Result<T1, MathError<T2>>;

export type { UnsignedIntegerResult };
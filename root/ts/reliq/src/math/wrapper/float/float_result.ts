import type { Float } from "@root";
import type { Result } from "@root";
import type { MathErrorCode } from "@root";
import type { MathError } from "@root";

type FloatResult<T1 extends MathErrorCode = MathErrorCode> = Result<Float, MathError<T1>>;

export type { FloatResult };
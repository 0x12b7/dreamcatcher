import {
    type MathErrorCode,
    type MathError,
    type Float,
    type Result
} from "@root";

type FloatResult<T1 extends MathErrorCode = MathErrorCode> = Result<Float, MathError<T1>>;

export type { FloatResult };
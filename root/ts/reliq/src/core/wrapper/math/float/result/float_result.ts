import {
    type MathErrorCode,
    type MathError,
    type Result,
    type Float
} from "@root";

export type FloatResult<T1 extends MathErrorCode = MathErrorCode> = Result<Float, MathError<T1>>;
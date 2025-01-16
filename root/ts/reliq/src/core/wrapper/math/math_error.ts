import {
    type MathErrorCode,
    type Error
} from "@root";

export type MathError<T1 extends MathErrorCode = MathErrorCode> = Error<T1>;
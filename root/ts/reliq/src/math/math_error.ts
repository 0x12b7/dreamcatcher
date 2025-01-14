import type { MathErrorCode } from "@root";
import { Error } from "@root";

type MathError<T1 extends MathErrorCode = MathErrorCode> = Error<T1>;

export type { MathError };
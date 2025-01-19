import { type UnsignedInteger } from "@root";
import { type Result } from "@root";
import { type MathError } from "@root";

export type UnsignedIntegerResult<T1 extends UnsignedInteger> = Result<T1, MathError>;
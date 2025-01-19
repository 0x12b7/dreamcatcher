import { type SignedInteger } from "@root";
import { type Result } from "@root";
import { type MathError } from "@root";

export type SignedIntegerResult<T1 extends SignedInteger> = Result<T1, MathError>;
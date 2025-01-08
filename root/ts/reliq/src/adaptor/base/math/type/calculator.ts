import { Result } from "@root";
import { MathError } from "@root";

export type Calculator<T1> = {
    add(v0: T1, v1: T1): Result<T1, MathError>;
    sub(v0: T1, v1: T1): Result<T1, MathError>;
    mul(v0: T1, v1: T1): Result<T1, MathError>;
    div(v0: T1, v1: T1): Result<T1, MathError>;
    pow(v0: T1, v1: T1): Result<T1, MathError>;
}
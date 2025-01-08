import type { Wrapper } from "@root";
import type { MathError } from "@root";
import type { Result } from "@root";

export type WrappedCalculator<T1> = {
    add(v: Wrapper<T1>): Result<Wrapper<T1>, MathError>;
    sub(v: Wrapper<T1>): Result<Wrapper<T1>, MathError>;
    mul(v: Wrapper<T1>): Result<Wrapper<T1>, MathError>;
    div(v: Wrapper<T1>): Result<Wrapper<T1>, MathError>;
    pow(v: Wrapper<T1>): Result<Wrapper<T1>, MathError>;
};
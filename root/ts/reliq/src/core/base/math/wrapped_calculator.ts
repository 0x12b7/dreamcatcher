import type { Wrapper } from "@root";
import type { MathError } from "@root";
import type { Result } from "@root";
import type { NumberLike } from "@root";

export type WrappedCalculator<T1> = {
    eq(v: NumberLike): boolean;
    lt(v: NumberLike): boolean;
    gt(v: NumberLike): boolean;
    lteq(v: NumberLike): boolean;
    gteq(v: NumberLike): boolean;
    add(v: NumberLike): Result<Wrapper<T1>, MathError>;
    sub(v: NumberLike): Result<Wrapper<T1>, MathError>;
    mul(v: NumberLike): Result<Wrapper<T1>, MathError>;
    div(v: NumberLike): Result<Wrapper<T1>, MathError>;
    pow(v: NumberLike): Result<Wrapper<T1>, MathError>;
    mod(v: NumberLike): Result<Wrapper<T1>, MathError>;
    sqrt(v: NumberLike): Result<Wrapper<T1>, MathError>;
};
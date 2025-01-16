import type { SignedIntegerLike } from "@root";
import type { SignedIntegerBrand } from "@root";
import type { SignedIntegerBrandToTypeMap } from "@root";
import type { LargestSignedIntegerResult } from "@root";
import type { MathViolation } from "@root";

type SignedInteger<T1 extends SignedIntegerBrand = SignedIntegerBrand> = {
    eq<T2 extends SignedIntegerLike>(value: T2): boolean;
    lt<T2 extends SignedIntegerLike>(value: T2): boolean;
    gt<T2 extends SignedIntegerLike>(value: T2): boolean;
    lteq<T2 extends SignedIntegerLike>(value: T2): boolean;
    gteq<T2 extends SignedIntegerLike>(value: T2): boolean;
    add<T2 extends SignedIntegerLike>(value: T2): LargestSignedIntegerResult<SignedIntegerBrandToTypeMap<T1>, T2, MathViolation.UpperArithmeticRange>;
    sub<T2 extends SignedIntegerLike>(value: T2): LargestSignedIntegerResult<SignedIntegerBrandToTypeMap<T1>, T2, MathViolation.LowerArithmeticRange>;
    mul<T2 extends SignedIntegerLike>(value: T2): LargestSignedIntegerResult<SignedIntegerBrandToTypeMap<T1>, T2, MathViolation.ArithmeticRange>;
    div<T2 extends SignedIntegerLike>(value: T2): LargestSignedIntegerResult<SignedIntegerBrandToTypeMap<T1>, T2, MathViolation.ArithmeticRangeAndDivisionByZero>;
};

export type { SignedInteger };
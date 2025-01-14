import type { UnsignedIntegerBrand } from "@root";
import type { UnsignedIntegerBrandToTypeMap } from "@root";
import type { LargestUnsignedIntegerResult } from "@root";
import type { MathViolation } from "@root";

type UnsignedInteger<T1 extends UnsignedIntegerBrand = UnsignedIntegerBrand> = {
    eq<T2 extends UnsignedInteger>(value: T2): boolean;
    lt<T2 extends UnsignedInteger>(value: T2): boolean;
    gt<T2 extends UnsignedInteger>(value: T2): boolean;
    lteq<T2 extends UnsignedInteger>(value: T2): boolean;
    gteq<T2 extends UnsignedInteger>(value: T2): boolean;
    add<T2 extends UnsignedInteger>(value: T2): LargestUnsignedIntegerResult<UnsignedIntegerBrandToTypeMap<T1>, T2, MathViolation.UpperArithmeticRange>;
    sub<T2 extends UnsignedInteger>(value: T2): LargestUnsignedIntegerResult<UnsignedIntegerBrandToTypeMap<T1>, T2, MathViolation.LowerArithmeticRange>;
    mul<T2 extends UnsignedInteger>(value: T2): LargestUnsignedIntegerResult<UnsignedIntegerBrandToTypeMap<T1>, T2, MathViolation.UpperArithmeticRange>;
    div<T2 extends UnsignedInteger>(value: T2): LargestUnsignedIntegerResult<UnsignedIntegerBrandToTypeMap<T1>, T2, MathViolation.DivisionByZero>;
};

export type { UnsignedInteger };
import type { UnsignedIntegerResult } from "@root";
import type { UnsignedInteger } from "@root";
import type { Numeric } from "@root";
import type { MathViolation } from "@root";
import type { Float } from "@root";
import type { I8 } from "@root";
import type { I16 } from "@root";
import type { I32 } from "@root";
import type { I64 } from "@root";
import type { I128 } from "@root";
import type { I256 } from "@root";
import type { I } from "@root";
import type { U8 } from "@root";
import type { U16 } from "@root";
import type { U32 } from "@root";
import type { U64 } from "@root";
import type { U128 } from "@root";
import type { U256 } from "@root";
import type { U } from "@root";
import type { Ok } from "@root";

type UnsignedIntegerResultMap<T1 extends UnsignedInteger, T2 extends UnsignedInteger> =
    T1 extends U8
        ? T2 extends number  ? UnsignedIntegerResult<U8, MathViolation.ArithmeticRangeAndPrecision>
        : T2 extends bigint  ? UnsignedIntegerResult<U8, MathViolation.ArithmeticRange>
        : T2 extends Float   ? UnsignedIntegerResult<U8, MathViolation.ArithmeticRangeAndPrecision>
        : T2 extends I8      ? UnsignedIntegerResult<U8, MathViolation.LowerArithmeticRange>
        



        ;

export type { UnsignedIntegerResultMap };
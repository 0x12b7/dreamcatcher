import type { FloatResult } from "@root";
import type { Numeric } from "@root";
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
import type { MathViolation } from "@root";
import type { Ok } from "@root";

type FloatResultMap<T1 extends Numeric = Numeric> =
    T1 extends number    ? FloatResult<MathViolation.ArithmeticRange> :
    T1 extends bigint    ? FloatResult<MathViolation.ArithmeticRange> :
    T1 extends Float     ? Ok<Float> :
    T1 extends I8        ? Ok<Float> :
    T1 extends I16       ? Ok<Float> :
    T1 extends I32       ? Ok<Float> :
    T1 extends I64       ? FloatResult<MathViolation.ArithmeticRange> :
    T1 extends I128      ? FloatResult<MathViolation.ArithmeticRange> :
    T1 extends I256      ? FloatResult<MathViolation.ArithmeticRange> :
    T1 extends I         ? FloatResult<MathViolation.ArithmeticRange> :
    T1 extends U8        ? Ok<Float> :
    T1 extends U16       ? Ok<Float> :
    T1 extends U32       ? Ok<Float> :
    T1 extends U64       ? FloatResult<MathViolation.UpperArithmeticRange> :
    T1 extends U128      ? FloatResult<MathViolation.UpperArithmeticRange> :
    T1 extends U256      ? FloatResult<MathViolation.UpperArithmeticRange> :
    T1 extends U         ? FloatResult<MathViolation.UpperArithmeticRange> :
    never;

export type { FloatResultMap };
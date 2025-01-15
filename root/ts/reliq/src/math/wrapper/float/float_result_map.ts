import * as Reliq from "@root";

type FloatResultMap<T1 extends Reliq.Numeric = Reliq.Numeric> =
    T1 extends number        ? Reliq.FloatResult<Reliq.MathViolation.ArithmeticRange> :
    T1 extends bigint        ? Reliq.FloatResult<Reliq.MathViolation.ArithmeticRange> :
    T1 extends Reliq.Float   ? Reliq.Ok<Reliq.Float> :
    T1 extends Reliq.I8      ? Reliq.Ok<Reliq.Float> :
    T1 extends Reliq.I16     ? Reliq.Ok<Reliq.Float> :
    T1 extends Reliq.I32     ? Reliq.Ok<Reliq.Float> :
    T1 extends Reliq.I64     ? Reliq.FloatResult<Reliq.MathViolation.ArithmeticRange> :
    T1 extends Reliq.I128    ? Reliq.FloatResult<Reliq.MathViolation.ArithmeticRange> :
    T1 extends Reliq.I256    ? Reliq.FloatResult<Reliq.MathViolation.ArithmeticRange> :
    T1 extends Reliq.I       ? Reliq.FloatResult<Reliq.MathViolation.ArithmeticRange> :
    T1 extends Reliq.U8      ? Reliq.Ok<Reliq.Float> :
    T1 extends Reliq.U16     ? Reliq.Ok<Reliq.Float> :
    T1 extends Reliq.U32     ? Reliq.Ok<Reliq.Float> :
    T1 extends Reliq.U64     ? Reliq.FloatResult<Reliq.MathViolation.UpperArithmeticRange> :
    T1 extends Reliq.U128    ? Reliq.FloatResult<Reliq.MathViolation.UpperArithmeticRange> :
    T1 extends Reliq.U256    ? Reliq.FloatResult<Reliq.MathViolation.UpperArithmeticRange> :
    T1 extends Reliq.U       ? Reliq.FloatResult<Reliq.MathViolation.UpperArithmeticRange> :
    never;

export type { FloatResultMap };
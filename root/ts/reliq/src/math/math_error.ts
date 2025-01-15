import * as Reliq from "@root";

type MathError<T1 extends Reliq.MathErrorCode = Reliq.MathErrorCode> = Reliq.Error<T1>;

export type { MathError };
import { R as Result, O as Ok } from '../error-Cjs7K6Np.cjs';

declare namespace Fpv {
    type Result<T1> = Result<T1, Error>;
    type Error = "FPV.ERR_DIVISION_BY_ZERO" | "FPV.ERR_PRECISION_IS_ZERO" | "FPV.ERR_PRECISION_IS_NEGATIVE";
    type Compatible<T1 extends bigint = 2n> = Fpv<T1> | bigint;
}
type Fpv<T1 extends bigint = 2n> = {
    name: Ok<string>;
};
declare function Fpv(): void;

export { Fpv };

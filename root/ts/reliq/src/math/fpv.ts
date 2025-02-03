import type { Result } from "@core";
import type { Wrapper } from "@core";
import type { Closure } from "@core";
import { INTERNAL_ERROR_MESSAGE } from "@common";
import { Error as Error0 } from "@core";
import { Err } from "@core";
import { Ok } from "@core";

/// This should be something that just works, it's crazy that it doesnt.
/// What are we? ... savagges!?

type _Result0<T1, T2> = Result<T1, T2>;

export namespace Fpv {
    export type Result<T1> = _Result0<T1, Error>;

    export type Error = 
        | "FPV.ERR_DIVISION_BY_ZERO"
        | "FPV.ERR_PRECISION_IS_ZERO"
        | "FPV.ERR_PRECISION_IS_NEGATIVE";

    export type Compatible<T1 extends bigint = 2n> = Fpv<T1> | bigint;
}

export type Fpv<T1 extends bigint = 2n> = {
    name: Ok<string>;
};

export function Fpv(){

}
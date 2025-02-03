import { Result as Result0 } from "@core";
import type { Wrapper } from "@core";
import type { Closure } from "@core";
import { INTERNAL_ERROR_MESSAGE } from "@common";
import { Error as Error0 } from "@core";
import { Err } from "@core";
import { Ok } from "@core";

export namespace Fpv {
    export type Result<T1> = Result0<T1, Error>;

    export type Error = 
        | "FPV.ERR_DIVISION_BY_ZERO"
        | "FPV.ERR_PRECISION_IS_ZERO"
        | "FPV.ERR_PRECISION_IS_NEGATIVE";

    export type Compatible<T1 extends bigint = 2n> = Fpv<T1> | bigint;
}

export type Fpv<T1 extends bigint = 2n> = {
    name: Ok<string>;
};

export function Fpv() {

}
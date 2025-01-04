import { Call } from "src/vm/ethereum/mod";
import { Deployment } from "src/vm/ethereum/mod";
import { Query } from "src/vm/ethereum/mod";

export type Transaction<T1 extends Array<unknown>> =
    | Call<T1>
    | Deployment<T1>
    | Query<T1>;
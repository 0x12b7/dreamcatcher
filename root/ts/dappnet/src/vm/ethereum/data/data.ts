import type { Arithmetic } from "src/vm/ethereum/mod";
import type { Base } from "src/vm/ethereum/mod";
import type { Array } from "src/vm/ethereum/mod";
import type { Struct } from "src/vm/ethereum/mod";

export type Data =
    | Arithmetic
    | Base
    | Array
    | Struct;


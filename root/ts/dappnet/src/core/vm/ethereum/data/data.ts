import type { Arithmetic } from "@core.vm.ethereum";
import type { Base } from "@core.vm.ethereum";
import type { Array } from "@core.vm.ethereum";
import type { Struct } from "@core.vm.ethereum";

export type Data =
    | Arithmetic
    | Base
    | Array
    | Struct;


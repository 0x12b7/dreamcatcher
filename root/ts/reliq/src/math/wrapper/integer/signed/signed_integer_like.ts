import type { I8 } from "@root";
import type { I16 } from "@root";
import type { I32 } from "@root";
import type { I64 } from "@root";
import type { I128 } from "@root";
import type { I256 } from "@root";
import type { I } from "@root";
 
type SignedIntegerLike =
    | I8
    | I16
    | I32
    | I64
    | I128
    | I256
    | I;

export type { SignedIntegerLike };
import type { SignedInteger } from "@root";
import type { I8 } from "@root";
import type { I16 } from "@root";
import type { I32 } from "@root";
import type { I64 } from "@root";
import type { I128 } from "@root";
import type { I256 } from "@root";
import type { I } from "@root";
import type { UnsignedInteger } from "@root";
import type { U8 } from "@root";
import type { U16 } from "@root";
import type { U32 } from "@root";
import type { U64 } from "@root";
import type { U128 } from "@root";
import type { U256 } from "@root";
import type { U } from "@root";

type Integer =
    | SignedInteger
    | I8
    | I16
    | I32
    | I64
    | I128
    | I256
    | I
    | UnsignedInteger
    | U8
    | U16
    | U32
    | U64
    | U128
    | U256
    | U;

export type { Integer };
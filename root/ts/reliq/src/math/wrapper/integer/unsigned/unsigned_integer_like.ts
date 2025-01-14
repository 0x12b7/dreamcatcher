import type { U8 } from "@root";
import type { U16 } from "@root";
import type { U32 } from "@root";
import type { U64 } from "@root";
import type { U128 } from "@root";
import type { U256 } from "@root";
import type { U } from "@root";

type UnsignedIntegerLike =
    | U8
    | U16
    | U32
    | U64
    | U128
    | U256
    | U;

export type { UnsignedIntegerLike };
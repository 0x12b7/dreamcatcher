import { type U8 } from "@root";
import { type U16 } from "@root";
import { type U32 } from "@root";
import { type U64 } from "@root";
import { type U128 } from "@root";
import { type U256 } from "@root";
import { type U } from "@root";

export type UnsignedIntegerGrid = {
    0: ["U8", U8],
    1: ["U16", U16],
    2: ["U32", U32],
    3: ["U64", U64],
    4: ["U128", U128],
    5: ["U256", U256],
    6: ["U", U]
};
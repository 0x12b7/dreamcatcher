import { type I8 } from "@root";
import { type I16 } from "@root";
import { type I32 } from "@root";
import { type I64 } from "@root";
import { type I128 } from "@root";
import { type I256 } from "@root";
import { type I } from "@root";

export type SignedIntegerGrid = {
    0: ["I8", I8],
    1: ["I16", I16],
    2: ["I32", I32],
    3: ["I64", I64],
    4: ["I128", I128],
    5: ["I256", I256],
    6: ["I", I]
};
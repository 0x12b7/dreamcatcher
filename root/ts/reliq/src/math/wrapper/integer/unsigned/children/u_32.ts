import type { UnsignedInteger } from "@root";
import type { UnsignedIntegerResultMap } from "@root";
import type { Numeric } from "@root";
import type { Branded } from "@root";

type U32 = 
    & UnsignedInteger<"U32">
    & Branded<"U32">;

function U32<T1 extends Numeric>(_value: T1): UnsignedIntegerResultMap<U32, T1> {
    /** @constructor */ {

    }
}

export { U32 };
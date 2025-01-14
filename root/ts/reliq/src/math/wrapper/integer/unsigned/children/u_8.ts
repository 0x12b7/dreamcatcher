import type { UnsignedInteger } from "@root";
import type { UnsignedIntegerResultMap } from "@root";
import type { Numeric } from "@root";
import type { Branded } from "@root";

type U8 = 
    & UnsignedInteger<"U8">
    & Branded<"U8">;

function U8<T1 extends Numeric>(_value: T1): UnsignedIntegerResultMap<U8, T1> {
    /** @constructor */ {

    }
}

export { U8 };
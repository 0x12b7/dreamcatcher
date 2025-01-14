import type { UnsignedInteger } from "@root";
import type { UnsignedIntegerResultMap } from "@root";
import type { Numeric } from "@root";
import type { Branded } from "@root";

type U = 
    & UnsignedInteger<"U">
    & Branded<"U">;

function U<T1 extends Numeric>(_value: T1): UnsignedIntegerResultMap<U, T1> {
    /** @constructor */ {

    }
}

export { U };
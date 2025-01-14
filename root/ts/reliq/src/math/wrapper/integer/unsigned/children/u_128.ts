import type { UnsignedInteger } from "@root";
import type { UnsignedIntegerResultMap } from "@root";
import type { Numeric } from "@root";
import type { Branded } from "@root";

type U128 = 
    & UnsignedInteger<"U128">
    & Branded<"U128">;

function U128<T1 extends Numeric>(_value: T1): UnsignedIntegerResultMap<U128, T1> {
    /** @constructor */ {

    }
}

export { U128 };
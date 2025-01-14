import type { UnsignedInteger } from "@root";
import type { UnsignedIntegerResultMap } from "@root";
import type { Numeric } from "@root";
import type { Branded } from "@root";

type U64 = 
    & UnsignedInteger<"U64">
    & Branded<"U64">;

function U64<T1 extends Numeric>(_value: T1): UnsignedIntegerResultMap<U64, T1> {
    /** @constructor */ {

    }
}

export { U64 };
import type { UnsignedInteger } from "@root";
import type { UnsignedIntegerResultMap } from "@root";
import type { Numeric } from "@root";
import type { Branded } from "@root";
import type { Wrapper } from "@root";

type U256 = 
    & UnsignedInteger<"U256">
    & Branded<"U256">
    & Wrapper<bigint>;

function U256<T1 extends Numeric>(_value: T1): UnsignedIntegerResultMap<U256, T1> {
    /** @constructor */ {

    }
}

export { U256 };
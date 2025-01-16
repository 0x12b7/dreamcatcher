import type { UnsignedInteger, Wrapper } from "@root";
import type { UnsignedIntegerResultMap } from "@root";
import type { Numeric } from "@root";
import type { Branded } from "@root";

type U16 = 
    & UnsignedInteger<"U16">
    & Branded<"U16">
    & Wrapper<bigint>;

function U16<T1 extends Numeric>(_value: T1): UnsignedIntegerResultMap<U16, T1> {
    /** @constructor */ {

    }
}

export { U16 };
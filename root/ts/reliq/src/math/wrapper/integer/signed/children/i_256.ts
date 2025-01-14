import type { SignedInteger } from "@root";
import type { SignedIntegerResultMap } from "@root";
import type { Numeric } from "@root";
import type { Branded } from "@root";
import type { Wrapper } from "@root";

type I256 = 
    & SignedInteger<"I256">
    & Branded<"I256">
    & Wrapper<bigint>;

function I256<T1 extends Numeric>(_value: T1): SignedIntegerResultMap<I256, T1> {
    /** @constructor */ {

    }
}

export { I256 };
import type { SignedInteger } from "@root";
import type { SignedIntegerResultMap } from "@root";
import type { Numeric } from "@root";
import type { Branded } from "@root";

type I128 = 
    & SignedInteger<"I128">
    & Branded<"I128">;

function I128<T1 extends Numeric>(_value: T1): SignedIntegerResultMap<I128, T1> {
    /** @constructor */ {

    }
}

export { I128 };
import type { SignedInteger } from "@root";
import type { SignedIntegerResultMap } from "@root";
import type { Numeric } from "@root";
import type { Branded } from "@root";

type I8 = 
    & SignedInteger<"I8">
    & Branded<"I8">;

function I8<T1 extends Numeric>(_value: T1): SignedIntegerResultMap<I8, T1> {
    /** @constructor */ {

    }
}

export { I8 };
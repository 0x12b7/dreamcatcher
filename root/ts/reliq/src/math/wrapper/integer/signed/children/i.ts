import type { SignedInteger } from "@root";
import type { SignedIntegerResultMap } from "@root";
import type { Numeric } from "@root";
import type { Branded } from "@root";

type I = 
    & SignedInteger<"I">
    & Branded<"I">;

function I<T1 extends Numeric>(_value: T1): SignedIntegerResultMap<I, T1> {
    /** @constructor */ {
        
    }
}

export { I };
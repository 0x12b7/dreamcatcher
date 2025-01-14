import type { SignedInteger } from "@root";
import type { SignedIntegerResultMap } from "@root";
import type { Numeric } from "@root";
import type { Branded } from "@root";
import type { Wrapper } from "@root";

type I32 = 
    & SignedInteger<"I32">
    & Branded<"I32">
    & Wrapper<bigint>;
    
function I32<T1 extends Numeric>(_value: T1): SignedIntegerResultMap<I32, T1> {
    /** @constructor */ {
        
    }
}

export { I32 };
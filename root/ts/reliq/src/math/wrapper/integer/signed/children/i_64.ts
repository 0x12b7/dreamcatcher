import type { SignedInteger, Wrapper } from "@root";
import type { SignedIntegerResultMap } from "@root";
import type { Numeric } from "@root";
import type { Branded } from "@root";

type I64 = 
    & SignedInteger<"I64">
    & Branded<"I64">
    & Wrapper<bigint>;

function I64<T1 extends Numeric>(_value: T1): SignedIntegerResultMap<I64, T1> {
    /** @constructor */ {
        
    }
}

export { I64 };
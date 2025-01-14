import type { SignedInteger } from "@root";
import type { SignedIntegerResultMap } from "@root";
import type { Numeric } from "@root";
import type { Branded } from "@root";

type I64 = 
    & SignedInteger<"I64">
    & Branded<"i64">;

function I64<T1 extends Numeric>(_value: T1): SignedIntegerResultMap<I64, T1> {
    /** @constructor */ {
        
    }
}

export { I64 };
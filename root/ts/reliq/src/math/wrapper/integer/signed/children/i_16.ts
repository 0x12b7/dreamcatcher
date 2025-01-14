import type { SignedInteger } from "@root";
import type { SignedIntegerResultMap } from "@root";
import type { Numeric } from "@root";
import type { Branded } from "@root";
import type { Wrapper } from "@root";

type I16 = 
    & SignedInteger<"I16">
    & Branded<"I16">
    & Wrapper<bigint>;

function I16<T1 extends Numeric>(_value: T1): SignedIntegerResultMap<I16, T1> {
    /** @constructor */ {

    }
}

export { I16 };
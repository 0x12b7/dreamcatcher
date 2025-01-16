import type { SignedInteger } from "@root";
import type { SignedIntegerResultMap } from "@root";
import type { Numeric } from "@root";
import type { Branded } from "@root";
import type { Wrapper } from "@root";

type I = 
    & SignedInteger<"I">
    & Branded<"I">
    & Wrapper<bigint>;

/**
 * **Warning**
 * Is the most permissive `Integer` which is infinite, may result in
 * out of memory exceptions.
 * 
 * **Always Ok**
 * - `bigint`
 * - `I8`
 * - `I16`
 * - `I32`
 * - `I64`
 * - `I128`
 * - `I256`
 * - `I`
 * 
 * **Example**
 * ```typescript
 *  I(5000000000000n).unwrapSafely();
 * ```
 */
function I<T1 extends Numeric>(_value: T1): SignedIntegerResultMap<I, T1> {
    /** @constructor */ {
        
    }
}

export { I };
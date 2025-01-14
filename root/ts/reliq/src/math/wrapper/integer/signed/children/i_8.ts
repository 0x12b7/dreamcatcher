import type { SignedInteger } from "@root";
import type { SignedIntegerResultMap } from "@root";
import type { Numeric } from "@root";
import type { Branded } from "@root";
import type { Wrapper } from "@root";
import { SignedIntegerParser } from "@root";
import { Ok } from "@root";

/**
 * **NOTE**
 * Holds integers in range `-255` to `255`. Always returns a `Result`
 * but constructing it with certain `Numeric` values will always
 * return `Ok`.
 * 
 * **Example**
 * ```typescript
 *  let I8(200n).unwrap();
 * 
 * 
 * ```
 * 
 * **Example**
 * ```typescript
 *  /// Will panic.
 *  I8(500n).unwrap();
 * 
 * ```
 */
type I8 = 
    & SignedInteger<"I8">
    & Branded<"I8">
    & Wrapper<bigint>;

/**
 * **Note**
 * Holds integers in range `-255` to `255`. Always returns a `Result`
 * but constructing it with certain `Numeric` values will always
 * return `Ok`.
 * 
 * **Note**
 * Enables to the enforcement of a range at result-time.
 * 
 * **Always Ok**
 * - `I8`
 * - `U8`
 * 
 * **Example**
 * ```typescript
 *  /// Will not panic because 200n is in range.
 *  I8(200n).unwrap();
 * ```
 * 
 * **Example**
 * ```typescript
 *  /// Will panic because 500n is not in range.
 *  I8(500n).unwrap();
 * 
 * ```
 */
function I8<T1 extends Numeric>(_value: T1): SignedIntegerResultMap<I8, T1>;
function I8<T1 extends Numeric>(_value: T1, _parser: SignedIntegerParser): SignedIntegerResultMap<I8, T1>;
function I8<T1 extends Numeric>(_0: T1, _1: SignedIntegerParser = SignedIntegerParser()): SignedIntegerResultMap<I8, T1> {
    let _value: T1;
    let _parser: SignedIntegerParser;
    /** @constructor */ {
        _value = _0;
        _parser = _1;
        return _parser.parse("I8", _value, {
            
        });
    }
}

export { I8 };

I8().display()
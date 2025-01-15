import * as Reliq from "@root";

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
    & Reliq.SignedInteger<"I8">
    & Reliq.Branded<"I8">
    & Reliq.Wrapper<bigint>;

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
function I8<T1 extends Reliq.Numeric>(_value: T1): Reliq.SignedIntegerResultMap<I8, T1>;
function I8<T1 extends Reliq.Numeric>(_value: T1, _parser: Reliq.SignedIntegerParser): Reliq.SignedIntegerResultMap<I8, T1>;
function I8<T1 extends Reliq.Numeric>(_0: T1, _1: Reliq.SignedIntegerParser = Reliq.SignedIntegerParser()): Reliq.SignedIntegerResultMap<I8, T1> {
    let _value: bigint;
    let _parser: Reliq.SignedIntegerParser;
    /** @constructor */ {
        _parser = _1;
        if (typeof _0 === "number") _value = BigInt(_0);
        else if (Reliq.isBrand(_0, "Float")) _value = BigInt(_0.unwrap());
        else if (typeof _0 === "bigint") _value = _0;
        else _value = _0.unwrap();
        return _parser.parse("I8", _0, {
            eq,
            lt,
            gt,
            lteq,
            gteq
        });
    }

    function eq<T2 extends SignedIntegerLike>(value: T2): boolean {
        return _value === value.unwrap();
    }

    function lt<T2 extends SignedIntegerLike>(value: T2): boolean {
        return _value < value.unwrap();
    }

    function gt<T2 extends SignedIntegerLike>(value: T2): boolean {
        return _value > value.unwrap();
    }

    function lteq<T2 extends SignedIntegerLike>(value: T2): boolean {
        return _value <= value.unwrap();
    }

    function gteq<T2 extends SignedIntegerLike>(value: T2): boolean {
        return _value >= value.unwrap();
    }

    function add<T2 extends Reliq.SignedIntegerLike>(value: T2): Reliq.LargestSignedIntegerResult<I8, T2, Reliq.MathViolation.UpperArithmeticRange> {
        let x: bigint = _value + value.unwrap();
        if (x > Reliq.MAX_I_8.unwrap()) return Reliq.Err(Reliq.Error({
            code: "MATH.ERR_UPPER_ARITHMETIC_RANGE_VIOLATION",
            message: Reliq.Some(

            ),
            payload: Reliq.None
        }));
        return Reliq.Ok()
    }
}

export { I8 };

I8().display()
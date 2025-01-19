import { Err, Error, None, Ok, Some, type Numeric } from "@root";
import { type Branded } from "@root";
import { type Wrapper } from "@root";
import { type FloatResult } from "@root";
import { MIN_FLOAT } from "@root";
import { MAX_FLOAT } from "@root";
import { NumericParser } from "@root";
import { isBranded } from "@root";

export type Float = 
    & Branded<"Float">
    & Wrapper<number>
    & {
    max(): Float;
    min(): Float;
    eq(value: Float): boolean;
    lt(value: Float): boolean;
    gt(value: Float): boolean;
    lteq(value: Float): boolean;
    gteq(value: Float): boolean;

    /**
     * **Range**
     * `- 2**53 - 1` >= `value` <= `2**53 - 1`.
     * 
     * **Return**
     * * `UpperArithmeticRangeViolation`.
     */
    add(value: Float): FloatResult;

    /**
     * **Range**
     * `- 2**53 - 1` >= `value` <= `2**53 - 1`.
     * 
     * **Return**
     * * `LowerArithmeticRangeViolation`.
     */
    sub(value: Float): FloatResult;
    
    /**
     * **Range**
     * `- 2**53 - 1` >= `value` <= `2**53 - 1`.
     * 
     * **Return**
     * * `UpperArithmeticRangeViolation`.
     * * `LowerArithmeticRangeViolation`.
     */
    mul(value: Float): FloatResult;

    /**
     * **Range**
     * `- 2**53 - 1` >= `value` <= `2**53 - 1`.
     * 
     * **Return**
     * * `UpperArithmeticRangeViolation`.
     * * `LowerArithmeticRangeViolation`.
     * * `DivisionByZero`.
     */
    div(value: Float): FloatResult;
};

/**
 * **Range**
 * `- 2**53 - 1` >= `_value` <= `2**53 - 1`.
 * 
 * **Return**
 * * `UpperArithmeticRangeViolation`.
 * * `LowerArithmeticRangeViolation`.
 */
export function Float<T1 extends Numeric>(_value: T1, _parser: NumericParser = NumericParser()): FloatResult {
    let _n: number;

    /** @constructor */ {
        let parserR = _parser
            .parseAsNumber(_value)
            .toResult()
            .mapErr(() => {
                return Error({
                    code: "MATH.ERR_UNSAFE_CONVERSION",
                    message: Some(
                        "\n" + "" +
                        "\n" + "This operation would result in precision loss"
                    ),
                    payload: None
                });
            })
            .map((value: number) => {
                return _n = value;
            })
            .map(() => {
                if (_n! < min().unwrap()) return Err(Error({
                    code: "MATH.ERR_LOWER_ARITHMETIC_RANGE_VIOLATION",
                    message: Some(
                        "\n" + "Any value below this point will result in incorrect arithmetic operations."
                    ),
                    payload: None
                }));
                if (_n! > max().unwrap()) return Err(Error({
                    code: "MATH.ERR_UPPER_ARITHMETIC_RANGE_VIOLATION",
                    message: Some(
                        ""
                    ),
                    payload: None
                }));
                return Ok({
                    type,
                    unwrap,
                    max,
                    min,
                    eq,
                    lt,
                    gt,
                    lteq,
                    gteq
                });
            });
        if (parserR.err()) return parserR;
        return parserR.unwrapSafely();
    }

    function type(): "Float" {
        return "Float";
    }

    function unwrap(): number {
        return _n;
    }

    function max(): Float {
        return MAX_FLOAT;
    }

    function min(): Float {
        return MIN_FLOAT;
    }

    function eq(value: Float): boolean {
        return _n === value.unwrap();
    }

    function lt(value: Float): boolean {
        return _n < value.unwrap();
    }

    function gt(value: Float): boolean {
        return _n > value.unwrap();
    }

    function lteq(value: Float): boolean {
        return _n <= value.unwrap();
    }

    function gteq(value: Float): boolean {
        return _n >= value.unwrap();
    }


}
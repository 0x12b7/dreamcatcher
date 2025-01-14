import type { FloatResult } from "@root";
import type { FloatResultMap } from "@root";
import type { Numeric } from "@root";
import type { MathViolation } from "@root";

/**
 * **Note**
 * A `number` wrapper with safe range enforcement at result-time.
 * 
 * **Example**
 * ```
 *  let float0: Float;
 *  let float1: Float;
 *  Float(500)
 *      .and(float => {
 *          float0 = float;
 *          return Float(500);
 *      })
 *      .and(float => {
 *          float1 = float;
 *          return Ok(undefined);
 *      })
 *      .and(() => {
 *          return float0.add(float1);
 *      })
 *      .map(float => float.unwrap())
 *      .map(value => console.log(value)) /// 1000
 *      .mapErr(e => e.code)
 *      .mapErr(code => {
 *          if (code === "MATH.ERR_UPPER_ARITHMETIC_RANGE_VIOLATION") {
 *              /// ...
 *          }
 *          return;
 *      });
 * ```
 */
type Float = {

    /**
     * **Note**
     * Compares two `Float`.
     * 
     * **Example**
     * ```
     *  let float0: Float;
     *  let float1: Float;
     *  Float(1)
     *      .and(float => {
     *          float0 = float;
     *          return Float(1);
     *      })
     *      .and(float => {
     *          float1 = float;
     *          return Ok(undefined);
     *      })
     *      .map(() => {
     *          return float0.eq(float1);    
     *      })
     *      .map(match => console.log(match)) /// true
     *      .expect("");
     * 
     * ```
     */
    eq(value: Float): boolean;


    lt(value: Float): boolean;
    gt(value: Float): boolean;
    lteq(value: Float): boolean;
    gteq(value: Float): boolean;
    add(value: Float): FloatResult<MathViolation.UpperArithmeticRange>;
    sub(value: Float): FloatResult<MathViolation.LowerArithmeticRange>;
    mul(value: Float): FloatResult<MathViolation.ArithmeticRange>;
    div(value: Float): FloatResult<MathViolation.ArithmeticRangeAndDivisionByZero>;
};

function Float<T1 extends Numeric>(_value: T1): FloatResultMap<T1> {
    /** @constructor */ {

    }
}

export { Float };
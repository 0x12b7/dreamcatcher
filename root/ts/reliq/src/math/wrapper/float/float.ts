import * as Reliq from "@root";

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
type Float = 
    & Reliq.Branded<"Float">
    & Reliq.Wrapper<number>
    & {

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
    add(value: Float): Reliq.FloatResult<Reliq.MathViolation.UpperArithmeticRange>;
    sub(value: Float): Reliq.FloatResult<Reliq.MathViolation.LowerArithmeticRange>;
    mul(value: Float): Reliq.FloatResult<Reliq.MathViolation.ArithmeticRange>;
    div(value: Float): Reliq.FloatResult<Reliq.MathViolation.ArithmeticRangeAndDivisionByZero>;
};

function Float<T1 extends Reliq.Numeric>(_value: T1): Reliq.FloatResultMap<T1> {
    let _n: number;
    /** @constructor */ {
        if (typeof _value === "number") _n = _value;
        else if (typeof _value === "bigint") _n = Number(_value);
        else if (Reliq.isBrand(_value, "Float")) _n = _value.unwrap();
        else _n = Number(_value.unwrap());
        return Reliq.Ok({
            eq,
            lt
        }) as any;
    }

    function eq(value: Float): boolean {
        return _n === value.unwrap();
    }

    function lt(value: Float): boolean {
        return _n < value.unwrap();
    }

    function add(value: Float): Reliq.FloatResult<Reliq.MathViolation.UpperArithmeticRange> {
        let result: number = _n + value.unwrap();
        if (result > Reliq.MAX_NUMBER) return Reliq.Err(Reliq.Error({
            code: "MATH.ERR_UPPER_ARITHMETIC_RANGE_VIOLATION",
            message: Reliq.Some(
                "\n" + "Arithmetic"
            ),
            payload: Reliq.None
        }));
    }
}

export { Float };
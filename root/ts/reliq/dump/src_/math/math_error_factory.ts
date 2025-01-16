import type { MathError, MathErrorFactoryRangeViolationPayload } from "@root";
import type { IntegerBrand } from "@root";
import { Error } from "@root";
import { Some } from "@root";
import { None } from "@root";

type MathErrorFactory = {
    spawnLowerArithmeticRangeViolation(payload: MathErrorFactoryRangeViolationPayload): MathError<"MATH.ERR_LOWER_ARITHMETIC_RANGE_VIOLATION">;
    spawnUpperArithmeticRangeViolation(payload: MathErrorFactoryRangeViolationPayload): MathError<"MATH.ERR_UPPER_ARITHMETIC_RANGE_VIOLATION">;
    spawnPrecisionViolation(brand: IntegerBrand, value: number): MathError<"MATH.ERR_PRECISION_VIOLATION">;
};

function MathErrorFactory(): MathErrorFactory {
    /** @constructor */ {
        return {
            spawnLowerArithmeticRangeViolation,
            spawnUpperArithmeticRangeViolation,
            spawnPrecisionViolation
        }
    }

    function spawnLowerArithmeticRangeViolation(payload: MathErrorFactoryRangeViolationPayload): MathError<"MATH.ERR_LOWER_ARITHMETIC_RANGE_VIOLATION"> {
        return Error({
            code: "MATH.ERR_LOWER_ARITHMETIC_RANGE_VIOLATION",
            message: Some(
                "\n" + "Arithmetic Underflow:" +
                "\n" + `The value ${ payload.value } is lower than the compatible ${ payload.brand } range.` +
                "\n" + "" +
                "\n" + `Expected range: ${ payload.lower } to ${ payload.upper }.` +
                "\n" + `Provided value: ${ payload.value }.` +
                "\n" + "" +
                "\n" + "The value must fall within the compatible range."
            ),
            payload: None
        });
    }

    function spawnUpperArithmeticRangeViolation(payload: MathErrorFactoryRangeViolationPayload): MathError<"MATH.ERR_UPPER_ARITHMETIC_RANGE_VIOLATION"> {
        return Error({
            code: "MATH.ERR_UPPER_ARITHMETIC_RANGE_VIOLATION",
            message: Some(
                "\n" + "Arithmetic Overflow:" +
                "\n" + `The value ${ payload.value } is higher than the compatible ${ payload.brand } range.` +
                "\n" + "" +
                "\n" + `Expected range: ${ payload.lower } to ${ payload.upper }.` +
                "\n" + `Provided value: ${ payload.value }.` +
                "\n" + "" +
                "\n" + "The value must fall within the compatible range."
            ),
            payload: None
        });
    }

    function spawnPrecisionViolation(brand: IntegerBrand, value: number): MathError<"MATH.ERR_PRECISION_VIOLATION"> {
        return Error({
            code: "MATH.ERR_PRECISION_VIOLATION",
            message: Some(
                "\n" + "Precision Loss:" +
                "\n" + `The value ${ value } is a floating-point number, but ${ brand } only accepts integer values.` +
                "\n" + "" +
                "\n" + `Truncate or round the value to an integer before using it as an ${ brand }.`
            ),
            payload: None
        });
    }
}

export { MathErrorFactory };
import { 
    type MathError,
    type IntegerBrand,
    Error,
    Some,
    None,
    LoggerRangeViolationPayload
} from "@root";

export type Logger = {
    writeInternalErrorMessage(message: string): string;
    writeLowerArithmeticRangeViolation(payload: LoggerRangeViolationPayload): MathError<"MATH.ERR_LOWER_ARITHMETIC_RANGE_VIOLATION">;
    writeUpperArithmeticRangeViolation(payload: LoggerRangeViolationPayload): MathError<"MATH.ERR_UPPER_ARITHMETIC_RANGE_VIOLATION">;
    writePrecisionViolation(value: number, brand: IntegerBrand): MathError<"MATH.ERR_PRECISION_VIOLATION">;
};

export function Logger(): Logger {
    /** @constructor */ {
        return ({
            writeInternalErrorMessage,
            writeLowerArithmeticRangeViolation,
            writeUpperArithmeticRangeViolation,
            writePrecisionViolation
        });
    }

    function writeInternalErrorMessage(message: string): string {
        return (
            "\n" + message +
            "\n" + "Uh-oh, looks like Reliq took a wrong turn!" + 
            "\n" + "Don't worry, it's not you-it's us." + 
            "\n" + "Please report this at dreamcatcher_foundation@proton.me" +
            "\n"
        );
    }

    function writeLowerArithmeticRangeViolation(payload: LoggerRangeViolationPayload): MathError<"MATH.ERR_LOWER_ARITHMETIC_RANGE_VIOLATION"> {
        return (Error({
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
        }));
    }

    function writeUpperArithmeticRangeViolation(payload: LoggerRangeViolationPayload): MathError<"MATH.ERR_UPPER_ARITHMETIC_RANGE_VIOLATION"> {
        return (Error({
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
        }));
    }

    function writePrecisionViolation(value: number, brand: IntegerBrand): MathError<"MATH.ERR_PRECISION_VIOLATION"> {
        return (Error({
            code: "MATH.ERR_PRECISION_VIOLATION",
            message: Some(
                "\n" + "Precision Loss:" +
                "\n" + `The value ${ value } is a floating-point number, but ${ brand } only accepts integer values.` +
                "\n" + "" +
                "\n" + `Truncate or round the value to an integer before using it as an ${ brand }.`
            ),
            payload: None
        }));
    }
}
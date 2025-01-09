import { Result } from "@root";
import { MathError } from "@root";

export type Polymorph<T1> = {
    toArray(): Array<T1>;
    toString(): string;
    toLocaleString(): string;
    toExponential(): string;

    /**
     * Converts the current numerical object to an exponential string 
     * with a specified number of digits.
     * 
     * @param digits - The number of digits to include in the fractional part. 
     * Must be between `0n` and `20n`, inclusive.
     * @returns - A `Result` containing either:
     *   - The exponential string representation on success.
     *   - A `RangeError` if the `digits` parameter is out of range.
     */
    toExponential(digits: bigint): Result<string, MathError<"MATH.ERR_OUT_OF_RANGE">>;

    toPrecision(): string;

    /**
     * Converts the current numerical object to a string with a specified number of significant digits.
     * 
     * @param precision - The number of significant digits for the representation.
     * Must be an integer between `1n` and `21n`, inclusive.
     * 
     * @returns - A `Result` object containing:
     * - The precise string representation of the number on success.
     * - A `RangeError` if the `precision` parameter is out of range.
     */
    toPrecision(precision: bigint): Result<string, MathError<"MATH.ERR_OUT_OF_RANGE">>;
};
import type { Numeric } from "@root";
import type { SignedIntegerLike } from "@root";
import type { SignedIntegerBrand } from "@root";
import type { SignedIntegerBrandToTypeMap } from "@root";
import type { SignedIntegerResultMap } from "@root";
import type { UnsignedIntegerLike } from "@root";
import type { Option } from "@root";
import { Ok } from "@root";
import { Err } from "@root";
import { Some } from "@root";
import { None } from "@root";
import { Error } from "@root";
import { Float } from "@root";
import { MAX_I_8 } from "@root";
import { MIN_I_8 } from "@root";
import { MAX_I_16 } from "@root";
import { MIN_I_16 } from "@root";
import { MAX_I_32 } from "@root";
import { MIN_I_32 } from "@root";
import { MAX_I_64 } from "@root";
import { MIN_I_64 } from "@root";
import { MAX_I_128 } from "@root";
import { MIN_I_128 } from "@root";
import { MAX_I_256 } from "@root";
import { MIN_I_256 } from "@root";
import { INTERNAL_ERROR_MESSAGE } from "@private";
import { isBrand } from "@root";
import { isWrapper } from "@root";

type SignedIntegerParser = {
    parse<T1 extends SignedIntegerBrand, T2 extends Numeric>(brand: T1, from: T2, instance: SignedIntegerBrandToTypeMap<T1>): SignedIntegerResultMap<SignedIntegerBrandToTypeMap<T1>, T2>;
};

function SignedIntegerParser(): SignedIntegerParser {
    /** @constructor */ {
        return { parse };
    }

    function parse<T1 extends SignedIntegerBrand, T2 extends Numeric>(brand: T1, from: T2, instance: SignedIntegerBrandToTypeMap<T1>): SignedIntegerResultMap<SignedIntegerBrandToTypeMap<T1>, T2> {
        return _parse(brand, from, instance);
    }
}

function _parse<T1 extends SignedIntegerBrand, T2 extends Numeric>(brand: T1, from: T2, instance: SignedIntegerBrandToTypeMap<T1>): SignedIntegerResultMap<SignedIntegerBrandToTypeMap<T1>, T2> {
    if (typeof from === "number" || isBrand(from, "Float")) {
        let value: number = isWrapper(from) ? from.unwrap() : from;
        let resultO: Option<SignedIntegerResultMap<SignedIntegerBrandToTypeMap<T1>, T2>> = None;
        _lower(brand).map(lower => {
            let expectMessage: string = "Upper range not available whilst mapping lower range." + INTERNAL_ERROR_MESSAGE;
            if (resultO.none() && value < lower) resultO = Some(Err(Error({
                code: "MATH.ERR_LOWER_ARITHMETIC_RANGE_VIOLATION",
                message: Some(
                    "\n" + "Arithmetic Underflow:" +
                    "\n" + `The value ${ value } is lower than the compatible ${ brand } range.` +
                    "\n" + "" +
                    "\n" + `Expected range: ${ lower } to ${ _upper(brand).expect(expectMessage) }.` +
                    "\n" + `Provided value: ${ value }.` +
                    "\n" + "" +
                    "\n" + "The value must fall within the compatible range."
                ),
                payload: None
            })) as any);
            return;
        });
        _upper(brand).map(upper => {
            let expectMessage: string = "Lower range not available whilst mapping upper range." + INTERNAL_ERROR_MESSAGE;
            if (resultO.none() && value > upper) resultO = Some(Err(Error({
                code: "MATH.ERR_UPPER_ARITHMETIC_RANGE_VIOLATION",
                message: Some(
                    "\n" + "Arithmetic Overflow:" +
                    "\n" + `The value ${ value } is higher than the compatible ${ brand } range.` +
                    "\n" + "" +
                    "\n" + `Expected range: ${ _lower(brand).expect(expectMessage) } to ${ upper }.` +
                    "\n" + `Provided value: ${ value }.` +
                    "\n" + "" +
                    "\n" + "The value must fall within the compatible range."
                ),
                payload: None
            })) as any);
            return;
        });
        if (value % 1 !== 0) resultO = Some(Err(Error({
            code: "MATH.ERR_PRECISION_VIOLATION",
            message: Some(
                "\n" + "Precision Loss:" +
                "\n" + `The value ${ value } is a floating-point number, but ${ brand } only accepts integer values.` +
                "\n" + "" +
                "\n" + `Truncate or round the value to an integer before using it as an ${ brand }.`
            ),
            payload: None
        })) as any);
        if (resultO.some()) return resultO.unwrapSafely();
    }
    else {
        let value: bigint = isWrapper(from) ? from.unwrap() : from;
        let resultO: Option<SignedIntegerResultMap<SignedIntegerBrandToTypeMap<T1>, T2>> = None;
        _lower(brand).map(lower => {
            let expectMessage: string = "Upper range not available whilst mapping lower range." + INTERNAL_ERROR_MESSAGE;
            if (resultO.none() && value < lower) resultO = Some(Err(Error({
                code: "MATH.ERR_LOWER_ARITHMETIC_RANGE_VIOLATION",
                message: Some(
                    "\n" + "Arithmetic Underflow:" +
                    "\n" + `The value ${ value } is lower than the compatible ${ brand } range.` +
                    "\n" + "" +
                    "\n" + `Expected range: ${ lower } to ${ _upper(brand).expect(expectMessage) }.` +
                    "\n" + `Provided value: ${ value }.` +
                    "\n" + "" +
                    "\n" + "The value must fall within the compatible range."
                ),
                payload: None
            })) as any);
            return;
        });
        _upper(brand).map(upper => {
            let expectMessage: string = "Lower range not available whilst mapping upper range." + INTERNAL_ERROR_MESSAGE;
            if (resultO.none() && value > upper) resultO = Some(Err(Error({
                code: "MATH.ERR_UPPER_ARITHMETIC_RANGE_VIOLATION",
                message: Some(
                    "\n" + "Arithmetic Overflow:" +
                    "\n" + `The value ${ value } is higher than the compatible ${ brand } range.` +
                    "\n" + "" +
                    "\n" + `Expected range: ${ _lower(brand).expect(expectMessage) } to ${ upper }.` +
                    "\n" + `Provided value: ${ value }.` +
                    "\n" + "" +
                    "\n" + "The value must fall within the compatible range."
                ),
                payload: None
            })) as any);
            return;
        });
    }
    return Ok(instance) as any;
}

function _upper(brand: SignedIntegerBrand): Option<bigint> {
    return brand === "I8" ? Some(MAX_I_8.unwrap()) :
        brand === "I16" ? Some(MAX_I_16.unwrap()) :
        brand === "I32" ? Some(MAX_I_32.unwrap()) :
        brand === "I64" ? Some(MAX_I_64.unwrap()) :
        brand === "I128" ? Some(MAX_I_128.unwrap()) :
        brand === "I256" ? Some(MAX_I_256.unwrap()) :
        None;
}

function _lower(brand: SignedIntegerBrand): Option<bigint> {
    return brand === "I8" ? Some(MIN_I_8.unwrap()) :
        brand === "I16" ? Some(MIN_I_16.unwrap()) :
        brand === "I32" ? Some(MIN_I_32.unwrap()) :
        brand === "I64" ? Some(MIN_I_64.unwrap()) :
        brand === "I128" ? Some(MIN_I_128.unwrap()) :
        brand === "I256" ? Some(MIN_I_256.unwrap()) :
        None;
}

export { SignedIntegerParser };
import { type Numeric } from "@root";
import { type NumericBrand } from "@root";
import { type Option } from "@root";
import { type Float } from "@root";
import { type I8 } from "@root";
import { type I16 } from "@root";
import { type I32 } from "@root";
import { type I64 } from "@root";
import { type I128 } from "@root";
import { type I256 } from "@root";
import { type U8 } from "@root";
import { type U16 } from "@root";
import { type U32 } from "@root";
import { type U64 } from "@root";
import { type U128 } from "@root";
import { type U256 } from "@root";
import { MAX_NUMBER } from "@root";
import { MIN_NUMBER } from "@root";
import { MAX_FLOAT } from "@root";
import { MIN_FLOAT } from "@root";
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
import { MAX_U_8 } from "@root";
import { MIN_U_8 } from "@root";
import { MAX_U_16 } from "@root";
import { MIN_U_16 } from "@root";
import { MAX_U_32 } from "@root";
import { MIN_U_32 } from "@root";
import { MAX_U_64 } from "@root";
import { MIN_U_64 } from "@root";
import { MAX_U_128 } from "@root";
import { MIN_U_128 } from "@root";
import { MAX_U_256 } from "@root";
import { MIN_U_256 } from "@root";
import { Some } from "@root";
import { None } from "@root";

export type NumericRangeFinder = {
    rangeOf(brand: "Number"): Some<[lower: number, upper: number]>;
    rangeOf(brand: "Bigint"): None;
    rangeOf(brand: "Float"): Some<[lower: Float, upper: Float]>;
    rangeOf(brand: "I8"): Some<[lower: I8, upper: I8]>;
    rangeOf(brand: "I16"): Some<[lower: I16, upper: I16]>;
    rangeOf(brand: "I32"): Some<[lower: I32, upper: I32]>;
    rangeOf(brand: "I64"): Some<[lower: I64, upper: I64]>;
    rangeOf(brand: "I128"): Some<[lower: I128, upper: I128]>;
    rangeOf(brand: "I256"): Some<[lower: I256, upper: I256]>;
    rangeOf(brand: "I"): None;
    rangeOf(brand: "U8"): Some<[lower: U8, upper: U8]>;
    rangeOf(brand: "U16"): Some<[lower: U16, upper: U16]>;
    rangeOf(brand: "U32"): Some<[lower: U32, upper: U32]>;
    rangeOf(brand: "U64"): Some<[lower: U64, upper: U64]>;
    rangeOf(brand: "U128"): Some<[lower: U128, upper: U128]>;
    rangeOf(brand: "U256"): Some<[lower: U256, upper: U256]>;
    rangeOf(brand: "U"): None;
};

export function NumericRangeFinder(): NumericRangeFinder {
    /** @constructor */ {
        return { rangeOf };
    }

    function rangeOf(brand: "Number"): Some<[lower: number, upper: number]>;
    function rangeOf(brand: "Bigint"): None;
    function rangeOf(brand: "Float"): Some<[lower: Float, upper: Float]>;
    function rangeOf(brand: "I8"): Some<[lower: I8, upper: I8]>;
    function rangeOf(brand: "I16"): Some<[lower: I16, upper: I16]>;
    function rangeOf(brand: "I32"): Some<[lower: I32, upper: I32]>;
    function rangeOf(brand: "I64"): Some<[lower: I64, upper: I64]>;
    function rangeOf(brand: "I128"): Some<[lower: I128, upper: I128]>;
    function rangeOf(brand: "I256"): Some<[lower: I256, upper: I256]>;
    function rangeOf(brand: "I"): None;
    function rangeOf(brand: "U8"): Some<[lower: U8, upper: U8]>;
    function rangeOf(brand: "U16"): Some<[lower: U16, upper: U16]>;
    function rangeOf(brand: "U32"): Some<[lower: U32, upper: U32]>;
    function rangeOf(brand: "U64"): Some<[lower: U64, upper: U64]>;
    function rangeOf(brand: "U128"): Some<[lower: U128, upper: U128]>;
    function rangeOf(brand: "U256"): Some<[lower: U256, upper: U256]>;
    function rangeOf(brand: "U"): None;
    function rangeOf(brand: NumericBrand): Option<[lower: Numeric, upper: Numeric]> {
        switch (brand) {
            case "Number": return Some<[number, number]>([MIN_NUMBER, MAX_NUMBER]);
            case "Float": return Some<[Float, Float]>([MIN_FLOAT, MAX_FLOAT]);
            case "I8": return Some<[I8, I8]>([MIN_I_8, MAX_I_8]);
            case "I16": return Some<[I16, I16]>([MIN_I_16, MAX_I_16]);
            case "I32": return Some<[I32, I32]>([MIN_I_32, MAX_I_32]);
            case "I64": return Some<[I64, I64]>([MIN_I_64, MAX_I_64]);
            case "I128": return Some<[I128, I128]>([MIN_I_128, MAX_I_128]);
            case "I256": return Some<[I256, I256]>([MIN_I_256, MAX_I_256]);
            case "U8": return Some<[U8, U8]>([MIN_U_8, MAX_U_8]);
            case "U16": return Some<[U16, U16]>([MIN_U_16, MAX_U_16]);
            case "U32": return Some<[U32, U32]>([MIN_U_32, MAX_U_32]);
            case "U64": return Some<[U64, U64]>([MIN_U_64, MAX_U_64]);
            case "U128": return Some<[U128, U128]>([MIN_U_128, MAX_U_128]);
            case "U256": return Some<[U256, U256]>([MIN_U_256, MAX_U_256]);
            default: return None;
        }
    }
}
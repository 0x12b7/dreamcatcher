import {
    type IntegerBrand,
    type Option,
    MAX_I_8,
    MIN_I_8,
    MAX_I_16,
    MIN_I_16,
    MAX_I_32,
    MIN_I_32,
    MAX_I_64,
    MIN_I_64,
    MAX_I_128,
    MIN_I_128,
    MAX_I_256,
    MIN_I_256,
    MAX_U_8,
    MIN_U_8,
    MAX_U_16,
    MIN_U_16,
    MAX_U_32,
    MIN_U_32,
    MAX_U_64,
    MIN_U_64,
    MAX_U_128,
    MIN_U_128,
    MAX_U_256,
    MIN_U_256,
    Some,
    None,
    OptionHandler
} from "@root";

export type RangeFinder = {
    range(): Option<[lower: bigint, upper: bigint]>;
    lower(): Option<bigint>;
    upper(): Option<bigint>;
};

export function RangeFinder(_brand: IntegerBrand): RangeFinder {
    let lowerO: Option<bigint>; 
    let upperO: Option<bigint>;
    
    /** @constructor */ {
        lowerO = (() => {
            switch (_brand) {
                case "I8": return Some(MIN_I_8.unwrap());
                case "I16": return Some(MIN_I_16.unwrap());
                case "I32": return Some(MIN_I_32.unwrap());
                case "I64": return Some(MIN_I_64.unwrap());
                case "I128": return Some(MIN_I_128.unwrap());
                case "I256": return Some(MIN_I_256.unwrap());
                case "U8": return Some(MIN_U_8.unwrap());
                case "U16": return Some(MIN_U_16.unwrap());
                case "U32": return Some(MIN_U_32.unwrap());
                case "U64": return Some(MIN_U_64.unwrap());
                case "U128": return Some(MIN_U_128.unwrap());
                case "U256": return Some(MIN_U_256.unwrap());
                default: return None;
            }
        })();
        upperO = (() => {
            switch (_brand) {
                case "I8": return Some(MAX_I_8.unwrap());
                case "I16": return Some(MAX_I_16.unwrap());
                case "I32": return Some(MAX_I_32.unwrap());
                case "I64": return Some(MAX_I_64.unwrap());
                case "I128": return Some(MAX_I_128.unwrap());
                case "I256": return Some(MAX_I_256.unwrap());
                case "U8": return Some(MAX_U_8.unwrap());
                case "U16": return Some(MAX_U_16.unwrap());
                case "U32": return Some(MAX_U_32.unwrap());
                case "U64": return Some(MAX_U_64.unwrap());
                case "U128": return Some(MAX_U_128.unwrap());
                case "U256": return Some(MAX_U_256.unwrap());
                default: return None;
            }
        })();
        return { range, lower, upper };
    }

    function range(): Option<[lower: bigint, upper: bigint]> {
        return OptionHandler.all(lowerO, upperO);
    }

    function lower(): Option<bigint> {
        return lowerO;
    }

    function upper(): Option<bigint> {
        return upperO;
    }
}
import type { IntegerBrand } from "@root";
import type { Option } from "@root";
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
import { OptionHandler } from "@root";

type RangeFinder = {
    range(): Option<[lower: bigint, upper: bigint]>;
    lower(): Option<bigint>;
    upper(): Option<bigint>;
};

function RangeFinder(_brand: IntegerBrand): RangeFinder {
    let lowerO: Option<bigint>; 
    let upperO: Option<bigint>;
    
    /** @constructor */ {
        lowerO = (() => {
            switch (_brand) {
                case "I8": return Some(MIN_I_8);
                case "I16": return Some(MIN_I_16);
                case "I32": return Some(MIN_I_32);
                case "I64": return Some(MIN_I_64);
                case "I128": return Some(MIN_I_128);
                case "I256": return Some(MIN_I_256);
                case "U8": return Some(MIN_U_8);
                case "U16": return Some(MIN_U_16);
                case "U32": return Some(MIN_U_32);
                case "U64": return Some(MIN_U_64);
                case "U128": return Some(MIN_U_128);
                case "U256": return Some(MIN_U_256);
                default: return None;
            }
        })();
        upperO = (() => {
            switch (_brand) {
                case "I8": return Some(MAX_I_8);
                case "I16": return Some(MAX_I_16);
                case "I32": return Some(MAX_I_32);
                case "I64": return Some(MAX_I_64);
                case "I128": return Some(MAX_I_128);
                case "I256": return Some(MAX_I_256);
                case "U8": return Some(MAX_U_8);
                case "U16": return Some(MAX_U_16);
                case "U32": return Some(MAX_U_32);
                case "U64": return Some(MAX_U_64);
                case "U128": return Some(MAX_U_128);
                case "U256": return Some(MAX_U_256);
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

export { RangeFinder };
import {
    type Option,
    type Integer,
    type IntegerBrand,
    type SignedIntegerBrandToTypeMap,
    type UnsignedIntegerBrandToTypeMap,
    Some,
    None,
    MAX_I_8,
    MAX_I_16,
    MAX_I_32,
    MAX_I_64,
    MAX_I_128,
    MAX_I_256,
    MIN_I_8,
    MIN_I_16,
    MIN_I_32,
    MIN_I_64,
    MIN_I_128,
    MIN_I_256,
    MAX_U_8,
    MAX_U_16,
    MAX_U_32,
    MAX_U_64,
    MAX_U_128,
    MAX_U_256,
    MIN_U_8,
    MIN_U_16,
    MIN_U_32,
    MIN_U_64,
    MIN_U_128,
    MIN_U_256,
    I8,
    I16,
    I32,
    I64,
    I128,
    I256,
    I,
    U8,
    U16,
    U32,
    U64,
    U128,
    U256,
    U
} from "@root";

type NumericRangeFinder = {
    range(): Option<[lower: T1, upper: T1]>;
    
    upper(brand: "I8"): Option<I8>;
    upper(brand: "I16"): Option<I16>;
    upper(brand: "I32"): Option<I32>;
    upper(brand: "I64"): Option<I64>;
    upper(brand: "I128"): Option<I128>;
    upper(brand: "I256"): Option<I256>;
    upper(brand: "I"): Option<I>;
    upper(brand: "U8"): Option<U8>;
    upper(brand: "U16"): Option<U16>;
    upper(brand: "U32"): Option<U32>;
    upper(brand: "U64"): Option<U64>;
    
    lower(): Option<T1>;
};

function NumericRangeFinder<T1 extends IntegerBrand>(_brand: T1): NumericRangeFinder<T1> {
    /** @constructor */ {
        return {
            upper
        };
    }


    function upper(): Option<SignedIntegerBrandToTypeMap<T1>> {
        if (_brand === "I") return None;
        else if (_brand === "U") return None;
        else if (_brand === "I8") return Some(MAX_I_8);
        else if (_brand === "I16") return Some(MAX_I_16);
        else if (_brand === "I32") return Some(MAX_I_32);

    }
}

export {
    NumericRangeFinder
};
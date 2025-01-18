import {
    type Numeric,
    type SignedInteger,
    type UnsignedInteger,
    type Integer,
    type Result,
    type MathError,
    Ok,
    Err,
    Some,
    None
} from "@root";

export type NumericParser = {
    parse<T1 extends Numeric, T2 extends Integer>(from: T1, to: T2): Result<T2, MathError>;
};

export function NumericParser() {

    function parse<T1 extends Numeric, T2 extends Integer>(from: T1, to: T2): Result<T2, MathError> {
        
    }

}
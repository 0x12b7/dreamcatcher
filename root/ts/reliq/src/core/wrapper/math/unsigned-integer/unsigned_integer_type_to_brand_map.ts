import {
    type UnsignedInteger,
    type U8,
    type U16,
    type U32,
    type U64,
    type U128,
    type U256,
    type U
} from "@root";

export type UnsignedIntegerTypeToBrandMap<T1 extends UnsignedInteger> =
    T1 extends U8 ? "U8" :
    T1 extends U16 ? "U16" :
    T1 extends U32 ? "U32" :
    T1 extends U64 ? "U64" :
    T1 extends U128 ? "U128" :
    T1 extends U256 ? "U256" :
    T1 extends U ? "U" :
    never;
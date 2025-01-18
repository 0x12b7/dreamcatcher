import {
    type SignedInteger,
    type I8,
    type I16,
    type I32,
    type I64,
    type I128,
    type I256,
    type I
} from "@root";

export type SignedIntegerTypeToBrandMap<T1 extends SignedInteger> =
    T1 extends I8 ? "I8" :
    T1 extends I16 ? "I16" :
    T1 extends I32 ? "I32" :
    T1 extends I64 ? "I64" :
    T1 extends I128 ? "I128" :
    T1 extends I256 ? "I256" :
    T1 extends I ? "I" :
    never;
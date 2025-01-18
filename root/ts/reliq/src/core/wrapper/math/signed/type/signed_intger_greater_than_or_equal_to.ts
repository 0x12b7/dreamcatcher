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

export type SignedIntegerGreaterThanOrEqualTo<T1 extends SignedInteger, T2 extends SignedInteger> =
    T1 extends T2 ? T1 :
    T1 extends I ? T1 :
    T2 extends I ? T2 :
    T1 extends I256 ? T1 :
    T2 extends I256 ? T2 :
    T1 extends I128 ? T1 :
    T2 extends I128 ? T2 :
    T1 extends I64 ? T1 :
    T2 extends I64 ? T2 :
    T1 extends I32 ? T1 :
    T2 extends I32 ? T2 :
    T1 extends I16 ? T1 :
    T2 extends I16 ? T2 :
    T1 extends I8 ? T1 :
    T2 extends I8 ? T2 :
    never;
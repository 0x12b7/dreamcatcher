import {
    type Float,
    type I8,
    type I16,
    type I32,
    type I64,
    type I128,
    type I256,
    type I,
    type U8,
    type U16,
    type U32,
    type U64,
    type U128,
    type U256,
    type U
} from "@root";

export type NumericDataTypeMap<
    T1 extends
        | "Float"
        | "I8"
        | "I16"
        | "I32"
        | "I64"
        | "I128"
        | "I256"
        | "I"
        | "U8"
        | "U16"
        | "U32"
        | "U64"
        | "U128"
        | "U256"
        | "U"
> =
    T1 extends "Float"   ? Float :
    T1 extends "I8"      ? I8 :
    T1 extends "I16"     ? I16 :
    T1 extends "I32"     ? I32 :
    T1 extends "I64"     ? I64 :
    T1 extends "I128"    ? I128 :
    T1 extends "I256"    ? I256 :
    T1 extends "I"       ? I :
    T1 extends "U8"      ? U8 :
    T1 extends "U16"     ? U16 :
    T1 extends "U32"     ? U32 :
    T1 extends "U64"     ? U64 :
    T1 extends "U128"    ? U128 :
    T1 extends "U256"    ? U256 :
    T1 extends "U"       ? U :
    never;
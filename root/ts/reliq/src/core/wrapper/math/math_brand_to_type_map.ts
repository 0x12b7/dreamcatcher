import {
    type SignedIntegerBrand,
    type SignedIntegerBrandToTypeMap,
    type UnsignedIntegerBrand,
    type UnsignedIntegerBrandToTypeMap,
    type IntegerBrand,
} from "@root";

export type MathBrandToTypeMap<T1 extends IntegerBrand> =
    T1 extends SignedIntegerBrand ? SignedIntegerBrandToTypeMap<T1> :
    T1 extends UnsignedIntegerBrand ? UnsignedIntegerBrandToTypeMap<T1> :
    never;
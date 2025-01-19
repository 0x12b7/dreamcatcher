import {
    type SignedIntegerResultMap,
    type Numeric,
    type Branded,
    type Wrapper
} from "@root";

export type I128 = 
    & Branded<"I128">
    & Wrapper<bigint>
    & {

};

export function I128<T1 extends Numeric>(_value: T1): SignedIntegerBrandToTypeMap<I128, T1> {
    
}
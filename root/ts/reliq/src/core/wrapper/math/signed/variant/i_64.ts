import {
    type SignedIntegerResultMap,
    type Numeric,
    type Branded,
    type Wrapper
} from "@root";

export type I64 = 
    & Branded<"I64">
    & Wrapper<bigint>
    & {

};

export function I64<T1 extends Numeric>(_value: T1): SignedIntegerResultMap<I64, T1> {
    
}
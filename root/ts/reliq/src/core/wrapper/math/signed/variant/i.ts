import {
    type SignedIntegerResultMap,
    type Numeric,
    type Branded,
    type Wrapper
} from "@root";

export type I = 
    & Branded<"I">
    & Wrapper<bigint>
    & {

};

export function I<T1 extends Numeric>(_value: T1): SignedIntegerResultMap<I, T1> {
    
}
import {
    type Branded,
    type Wrapper,
    type Numeric
} from "@root";

export type I16 = 
    & Branded<"I16">
    & Wrapper<bigint>
    & {

};

export function I16<T1 extends Numeric>(_value: T1): SignedIntegerResultMap<I16, T1> {
    
}
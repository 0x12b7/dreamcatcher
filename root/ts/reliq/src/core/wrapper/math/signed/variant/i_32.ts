import {
    type Wrapper,
    type Numeric,
    type Branded
} from "@root";

export type I32 = 
    & Branded<"I32">
    & Wrapper<bigint>
    & {

};

export function I32<T1 extends Numeric>(_value: T1): SignedIntegerResultMap<I32, T1> {
    
}
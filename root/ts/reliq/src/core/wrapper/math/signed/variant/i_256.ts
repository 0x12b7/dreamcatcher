import {
    type SignedIntegerResultMap,
    type Numeric,
    type Branded,
    type Wrapper
} from "@root";

export type I256 = 
    & Branded<"I256">
    & Wrapper<bigint>
    & {
    
};

export function I256<T1 extends Numeric>(_value: T1): SignedIntegerResultMap<I256, T1> {

}
import {
    type SignedIntegerResultMap,
    type Numeric,
    type Branded
} from "@root";

export type I8 = 
    & Branded<"I8">
    & {
    
};

export function I8<T1 extends Numeric>(_value: T1): SignedIntegerResultMap<I8, T1> {

}
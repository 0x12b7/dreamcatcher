import { type Branded } from "@root";
import { type Numeric } from "@root";
import { type UnsignedIntegerResultMap } from "@root";

export type U128 = 
    & Branded<"U128">
    & {
    
};

export function U128<T1 extends Numeric>(_value: T1): UnsignedIntegerResultMap<U128, T1> {
    
}
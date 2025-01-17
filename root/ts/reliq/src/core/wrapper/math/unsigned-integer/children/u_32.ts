import { type Branded } from "@root";
import { type Numeric } from "@root";
import { type UnsignedIntegerResultMap } from "@root";

export type U32 = 
    & Branded<"U32">
    & {

};

export function U32<T1 extends Numeric>(_value: T1): UnsignedIntegerResultMap<U32, T1> {
    
}
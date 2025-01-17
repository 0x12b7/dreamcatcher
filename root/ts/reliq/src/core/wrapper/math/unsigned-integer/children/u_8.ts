import { type Branded } from "@root";
import { type Numeric } from "@root";
import { type UnsignedIntegerResultMap } from "@root";

export type U8 = 
    & Branded<"U8">
    & {
    
};

export function U8<T1 extends Numeric>(_value: T1): UnsignedIntegerResultMap<U8, T1> {

}
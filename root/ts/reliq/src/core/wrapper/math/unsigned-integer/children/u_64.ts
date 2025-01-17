import { type Branded } from "@root";
import { type Numeric } from "@root";
import { type UnsignedIntegerResultMap } from "@root";

export type U64 = 
    & Branded<"U64">
    & {

};

export function U64<T1 extends Numeric>(_value: T1): UnsignedIntegerResultMap<U64, T1> {
    
}
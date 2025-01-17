import { type Branded } from "@root";
import { type Numeric } from "@root";
import { type UnsignedIntegerResultMap } from "@root";

export type U = 
    & Branded<"U">
    & {};

export function U<T1 extends Numeric>(_value: T1): UnsignedIntegerResultMap<U, T1> {
    
}
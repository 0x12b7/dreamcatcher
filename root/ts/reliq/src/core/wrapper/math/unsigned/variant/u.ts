import { type Branded, type Wrapper } from "@root";
import { type Numeric } from "@root";
import { type UnsignedIntegerResultMap } from "@root";

export type U = 
    & Branded<"U">
    & Wrapper<bigint>
    & {};

export function U<T1 extends Numeric>(_value: T1): UnsignedIntegerResultMap<U, T1> {
    
}
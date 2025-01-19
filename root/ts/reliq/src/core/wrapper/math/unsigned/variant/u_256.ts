import { type Branded, type Wrapper } from "@root";
import { type Numeric } from "@root";
import { type UnsignedIntegerResultMap } from "@root";

export type U256 = 
    & Branded<"U256">
    & Wrapper<bigint>
    & {};

export function U256<T1 extends Numeric>(_value: T1): UnsignedIntegerResultMap<U256, T1> {
    
}
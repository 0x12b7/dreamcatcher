import { type Numeric } from "@root";
import { type Branded } from "@root";
import { type Wrapper } from "@root";

export type U8 = 
    & Branded<"U8">
    & Wrapper<bigint>
    & {
    
};

export function U8<T1 extends Numeric>(_value: T1): UnsignedIntegerResultMap<U8, T1> {

}
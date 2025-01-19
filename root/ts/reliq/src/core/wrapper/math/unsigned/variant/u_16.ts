import { type Branded, type Wrapper } from "@root";
import { type Numeric } from "@root";
import { type UnsignedIntegerResultMap } from "@root";

export type U16 = 
    & Branded<"U16">
    & Wrapper<bigint>
    & {

};

export function U16<T1 extends Numeric>(_value: T1): UnsignedIntegerResultMap<U16, T1> {

}
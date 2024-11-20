import type {AbsoluteUnit} from "@silk";
import type {BaseProp} from "@silk";

export type AbsoluteUnitProp = BaseProp | `${number}${AbsoluteUnit}` | number;
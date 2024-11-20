import type {SizeUnit} from "@silk";
import type {BaseProp} from "@silk";

export type SizeUnitProp = BaseProp | `${number}${SizeUnit}` | number;
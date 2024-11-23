import type {SizeUnit} from "->std-react";
import type {BaseProp} from "->std-react";

export type SizeUnitProp = BaseProp | `${number}${SizeUnit}` | number;
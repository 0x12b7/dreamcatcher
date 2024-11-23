import type {AbsoluteUnit} from "->std-react";
import type {BaseProp} from "->std-react";

export type AbsoluteUnitProp = BaseProp | `${number}${AbsoluteUnit}` | number;
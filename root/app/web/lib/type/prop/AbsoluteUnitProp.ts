import type {AbsoluteUnit} from "->web.lib";
import type {BaseProp} from "->web.lib";

export type AbsoluteUnitProp = BaseProp | `${number}${AbsoluteUnit}` | number;
import type {SizeUnit} from "->web.lib";
import type {BaseProp} from "->web.lib";

export type SizeUnitProp = BaseProp | `${number}${SizeUnit}` | number;
import type {RelativeUnit} from "->web.lib";
import type {BaseProp} from "->web.lib";

export type RelativeUnitProp = BaseProp | `${number}${RelativeUnit}`;
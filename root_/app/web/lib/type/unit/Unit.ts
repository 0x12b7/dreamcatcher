import type {AbsoluteUnit} from "->web.lib";
import type {AngleUnit} from "->web.lib";
import type {FrequencyUnit} from "->web.lib";
import type {RelativeUnit} from "->web.lib";
import type {ResolutionUnit} from "->web.lib";
import type {TimeUnit} from "->web.lib";

export type Unit =
    | AbsoluteUnit
    | AngleUnit
    | FrequencyUnit
    | RelativeUnit
    | ResolutionUnit
    | TimeUnit;
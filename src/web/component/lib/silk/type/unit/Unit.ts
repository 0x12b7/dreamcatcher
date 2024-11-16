import type {AbsoluteUnit} from "@silk";
import type {AngleUnit} from "@silk";
import type {FrequencyUnit} from "@silk";
import type {RelativeUnit} from "@silk";
import type {ResolutionUnit} from "@silk";
import type {TimeUnit} from "@silk";

export type Unit =
    | AbsoluteUnit
    | AngleUnit
    | FrequencyUnit
    | RelativeUnit
    | ResolutionUnit
    | TimeUnit;
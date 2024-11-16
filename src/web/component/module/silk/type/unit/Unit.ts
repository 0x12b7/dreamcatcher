import type {AbsoluteUnit} from "@component/module/silk/Index";
import type {AngleUnit} from "@component/module/silk/Index";
import type {FrequencyUnit} from "@component/module/silk/Index";
import type {RelativeUnit} from "@component/module/silk/Index";
import type {ResolutionUnit} from "@component/module/silk/Index";
import type {TimeUnit} from "@component/module/silk/Index";

export type Unit =
    | AbsoluteUnit
    | AngleUnit
    | FrequencyUnit
    | RelativeUnit
    | ResolutionUnit
    | TimeUnit;
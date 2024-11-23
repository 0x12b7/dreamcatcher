import type {AbsoluteUnit} from "root/ts/module/std-react/Index";
import type {AngleUnit} from "root/ts/module/std-react/Index";
import type {FrequencyUnit} from "root/ts/module/std-react/Index";
import type {RelativeUnit} from "root/ts/module/std-react/Index";
import type {ResolutionUnit} from "root/ts/module/std-react/Index";
import type {TimeUnit} from "root/ts/module/std-react/Index";

export type Unit =
    | AbsoluteUnit
    | AngleUnit
    | FrequencyUnit
    | RelativeUnit
    | ResolutionUnit
    | TimeUnit;
import type { TypeGuard } from "@core"
import type { Option } from "@core";

export type Parsable = {
    parse<T1>(guard: TypeGuard<T1>): Option<T1>;
};
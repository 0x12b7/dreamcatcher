import type { TypeGuard } from "@root"
import type { Option } from "@root";

type Parsable = {
    parse<T1>(guard: TypeGuard<T1>): Option<T1>;
};

export type { Parsable };
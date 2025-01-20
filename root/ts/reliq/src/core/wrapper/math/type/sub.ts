import type { Size } from "./size";
import type { LengthOf } from "./length_of";

export type Sub<T1 extends number, T2 extends number> = 
    Size<T1> extends [...(infer T3), ...Size<T2>]
        ? LengthOf<T3>
        : never;
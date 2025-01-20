import type { LengthOf } from "./length_of";
import type { Size } from "./size";

export type Add<T1 extends number, T2 extends number> = LengthOf<[...Size<T1>, ...Size<T2>]>;
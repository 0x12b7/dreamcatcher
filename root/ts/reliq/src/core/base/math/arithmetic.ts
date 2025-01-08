import type { WrappedCalculator } from "@root";
import type { Polymorph } from "@root";
import type { Span } from "@root";

export type Arithmetic<T1> = 
    & WrappedCalculator<T1>
    & Exclude<Polymorph<T1>,
        | "toArray">
    & Exclude<Span<T1>,
        | "at">;
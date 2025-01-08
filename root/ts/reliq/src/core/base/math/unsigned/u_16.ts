import type { Branded } from "@root";
import type { Wrapper } from "@root";
import type { WrappedCalculator } from "@root";

export type U16 =
    & Branded<"U16">
    & Wrapper<bigint>
    & WrappedCalculator<bigint>;
import type { Branded } from "@root";
import type { Wrapper } from "@root";
import type { WrappedCalculator } from "@root";

export type U8 =
    & Branded<"U8">
    & Wrapper<bigint>
    & WrappedCalculator<bigint>;
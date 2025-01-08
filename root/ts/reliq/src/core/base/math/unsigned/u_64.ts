import type { Branded } from "@root";
import type { Wrapper } from "@root";
import type { WrappedCalculator } from "@root";

export type U64 =
    & Branded<"U64">
    & Wrapper<bigint>
    & WrappedCalculator<bigint>;
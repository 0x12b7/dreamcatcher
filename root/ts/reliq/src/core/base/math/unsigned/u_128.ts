import type { Branded } from "@root";
import type { Wrapper } from "@root";
import type { WrappedCalculator } from "@root";

export type U128 =
    & Branded<"U128">
    & Wrapper<bigint>
    & WrappedCalculator<bigint>;
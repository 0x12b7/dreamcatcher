import type { Branded } from "@root";
import type { Wrapper } from "@root";
import type { WrappedCalculator } from "@root";

export type U256 =
    & Branded<"U256">
    & Wrapper<bigint>
    & WrappedCalculator<bigint>;
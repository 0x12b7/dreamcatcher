import type { Branded } from "@root";
import type { Wrapper } from "@root";
import type { WrappedCalculator } from "@root";

export type U32 =
    & Branded<"U32">
    & Wrapper<bigint>
    & WrappedCalculator<bigint>;
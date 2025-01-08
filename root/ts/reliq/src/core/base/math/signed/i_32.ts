import type { Branded } from "@root";
import type { Wrapper } from "@root";
import type { WrappedCalculator } from "@root";

export type I32 =
    & Branded<"I32">
    & Wrapper<bigint>
    & WrappedCalculator<bigint>;
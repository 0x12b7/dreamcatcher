import type { Branded } from "@root";
import type { Wrapper } from "@root";
import type { WrappedCalculator } from "@root";

export type I8 =
    & Branded<"I8">
    & Wrapper<bigint>
    & WrappedCalculator<bigint>;
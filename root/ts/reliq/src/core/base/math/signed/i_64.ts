import type { Branded } from "@root";
import type { Wrapper } from "@root";
import type { WrappedCalculator } from "@root";

export type I64 =
    & Branded<"I64">
    & Wrapper<bigint>
    & WrappedCalculator<bigint>;
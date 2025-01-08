import type { Branded } from "@root";
import type { Wrapper } from "@root";
import type { WrappedCalculator } from "@root";

export type I128 =
    & Branded<"I128">
    & Wrapper<bigint>
    & WrappedCalculator<bigint>;
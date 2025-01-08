import type { Branded } from "@root";
import type { Wrapper } from "@root";
import type { WrappedCalculator } from "@root";

export type I256 =
    & Branded<"I256">
    & Wrapper<bigint>
    & WrappedCalculator<bigint>;
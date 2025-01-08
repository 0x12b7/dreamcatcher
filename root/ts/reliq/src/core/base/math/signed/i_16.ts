import type { Branded } from "@root";
import type { Wrapper } from "@root";
import type { WrappedCalculator } from "@root";

export type I16 =
    & Branded<"I16">
    & Wrapper<bigint>
    & WrappedCalculator<bigint>;
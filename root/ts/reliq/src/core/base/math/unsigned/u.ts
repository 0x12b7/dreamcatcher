import type { Wrapper } from "@root";
import type { WrappedCalculator } from "@root";
import type { NumberLike } from "@root";
import type { Branded } from "@root";
import { isBranded } from "@root";

export type U = 
    & Branded<"U">
    & Wrapper<bigint>
    & WrappedCalculator<bigint>;
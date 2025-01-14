import type { SignedIntegerLike } from "@root";
import type { UnsignedIntegerLike } from "@root";
import type { Float } from "@root";

type Numeric =
    | Float
    | number
    | bigint
    | SignedIntegerLike
    | UnsignedIntegerLike;

export type { Numeric };
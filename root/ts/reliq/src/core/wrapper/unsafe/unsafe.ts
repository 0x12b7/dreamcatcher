import type { Branded } from "@core";
import type { Wrapper } from "@core";
import type { Parsable } from "@core";

export type Unsafe =
    & Branded<"UNSAFE">
    & Wrapper<unknown>
    & Parsable;
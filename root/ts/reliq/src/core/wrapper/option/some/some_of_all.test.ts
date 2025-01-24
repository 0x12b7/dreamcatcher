import type { Option } from "@root";
import type { Some } from "@root";
import type { SomeOfAll } from "@root";

/** @script */
let value: SomeOfAll<[
    Some<200n>,
    Option<201n>,
    Option<202n>
]>
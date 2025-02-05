import type { Option } from "@root";
import type { SomeValOfAll } from "@root";

/** @script */
/// Should be `[200n, 201n, 202n]`.
let value: SomeValOfAll<[Option<200n>, Option<201n>, Option<202n>]>;
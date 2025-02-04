import type { Option } from "@core";
import type { SomeValOfAll } from "@core";

/** @script */
/// Should be `[200n, 201n, 202n]`.
let value: SomeValOfAll<[Option<200n>, Option<201n>, Option<202n>]>;
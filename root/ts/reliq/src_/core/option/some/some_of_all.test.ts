import type { Option } from "@core";
import type { Some } from "@core";
import type { SomeOfAll } from "@core";

/** @script */
/// Should be `[200n, never, never]`.
let value: SomeOfAll<[Some<200n>, Option<201n>, Option<202n>]>;
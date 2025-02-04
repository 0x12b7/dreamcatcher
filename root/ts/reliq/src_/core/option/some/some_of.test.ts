import type { Option } from "@core";
import type { SomeOf } from "@core";

/** @script */
/// Should be `Some<200n>`.
let value: SomeOf<Option<200n>>;
import type { Option } from "@root";
import type { SomeOf } from "@root";

/** @script */
/// Should be `Some<200n>`.
let value: SomeOf<Option<200n>>;
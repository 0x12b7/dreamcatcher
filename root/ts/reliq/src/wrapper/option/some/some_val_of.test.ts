import type { Option } from "@root";
import type { SomeValOf } from "@root";

/** @script */
/// Should be 200n.
let value: SomeValOf<Option<200n>>;
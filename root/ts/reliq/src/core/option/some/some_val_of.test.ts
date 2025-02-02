import type { Option } from "@core";
import type { SomeValOf } from "@core";

/** @script */
/// Should be `200n`.
let value: SomeValOf<Option<200n>>;
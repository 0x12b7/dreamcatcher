import type { OkValOf } from "@core";
import type { Result } from "@core";

/** @script */
/// Should be `200n`.
let value: OkValOf<Result<200n, 404n>>;
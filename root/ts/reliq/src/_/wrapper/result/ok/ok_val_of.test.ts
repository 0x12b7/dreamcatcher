import type { OkValOf } from "@root";
import type { Result } from "@root";

/** @script */
/// Should be `200n`.
let value: OkValOf<Result<200n, 404n>>;
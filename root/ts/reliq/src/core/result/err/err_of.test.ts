import type { Result } from "@core";
import type { ErrOf } from "@core";

/** @script */
/// Should be `Err<404n>`.
let value: ErrOf<Result<200n, 404n>>;
import type { ErrValOfAll } from "@core";
import type { Result } from "@core";

/** @script */
/// Should be `[404n, 405n]`.
let value: ErrValOfAll<[Result<200n, 404n>, Result<200n, 405n>]>;
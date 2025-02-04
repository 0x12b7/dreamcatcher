import type { OkValOfAll } from "@core";
import type { Result } from "@core";

/** @script */
/// Should be `[200n, 201n]`.
let value: OkValOfAll<[Result<200n, 404n>, Result<201n, 404n>]>;
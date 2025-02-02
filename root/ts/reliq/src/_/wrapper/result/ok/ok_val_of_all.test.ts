import type { OkValOfAll } from "@root";
import type { Result } from "@root";

/** @script */
/// Should be `[200n, 201n]`.
let value: OkValOfAll<[Result<200n, 404n>, Result<201n, 404n>]>;
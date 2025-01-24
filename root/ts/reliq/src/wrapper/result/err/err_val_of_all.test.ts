import type { ErrValOfAll } from "@root";
import type { Result } from "@root";

/** @script */
/// Should be [404n, 500n].
let value: ErrValOfAll<[Result<200n, 404n>, Result<200n, 500n>]>;
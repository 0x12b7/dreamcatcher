import type { OkValOfAll } from "@root";
import type { Result } from "@root";

/** @script */
/// Should be [404n, 600n].
let value: OkValOfAll<[Result<200n, 404n>, Result<600n, 404n>]>;
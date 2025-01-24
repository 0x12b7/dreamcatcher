import type { Result } from "@root";
import type { ErrOf } from "@root";

/** @script */
/// Should be Err<404n>.
let value: ErrOf<Result<200n, 404n>>;
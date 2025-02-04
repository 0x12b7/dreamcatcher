import type { OkOfAll } from "@root";
import type { Ok } from "@root";
import type { Err } from "@root";

/** @script */
/// Should be `[Ok<200n>, never, Ok<201n>]`.
let value: OkOfAll<[Ok<200n>, Err<404n>, Ok<201n>]>;
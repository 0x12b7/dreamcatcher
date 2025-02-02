import type { OkOfAll } from "@core";
import type { Ok } from "@core";
import type { Err } from "@core";

/** @script */
/// Should be `[Ok<200n>, never, Ok<201n>]`.
let value: OkOfAll<[Ok<200n>, Err<404n>, Ok<201n>]>;
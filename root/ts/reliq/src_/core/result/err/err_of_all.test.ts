import type { Ok } from "@core";
import type { Err } from "@core";
import type { ErrOfAll } from "@core";

/** @script */
/// Should be `[Err<404n>, never, Err<405n>]`.
let value: ErrOfAll<[Err<404n>, Ok<200n>, Err<405n>]>
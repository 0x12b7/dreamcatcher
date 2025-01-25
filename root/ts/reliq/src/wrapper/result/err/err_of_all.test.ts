import type { Ok } from "@root";
import type { Err } from "@root";
import type { ErrOfAll } from "@root";

/** @script */
/// Should be `[Err<404n>, never, Err<405n>]`.
let value: ErrOfAll<[Err<404n>, Ok<200n>, Err<405n>]>
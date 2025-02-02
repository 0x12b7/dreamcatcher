import type { OkOf } from "@core";
import type { Ok } from "@core";
import type { Err } from "@core";

/** @script */
/// Should be `Ok<200n>`
let value: OkOf<Ok<200n> | Err<404n>>;
import type { OkOf } from "@root";
import type { Ok } from "@root";
import type { Err } from "@root";

/** @script */
/// Should be `Ok<200n>`
let value: OkOf<Ok<200n> | Err<404n>>;
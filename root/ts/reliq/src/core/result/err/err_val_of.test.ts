import type { ErrValOf } from "@core";
import type { Err } from "@core";

/** @script */
/// Should be `404n`.
let value: ErrValOf<Err<404n>>;
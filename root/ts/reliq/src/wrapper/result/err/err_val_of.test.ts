import type { ErrValOf } from "@root";
import type { Err } from "@root";

/** @script */
/// Should be 404n.
let value: ErrValOf<Err<404n>>;
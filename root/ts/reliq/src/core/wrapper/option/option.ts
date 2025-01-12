import type { Some } from "@core";
import type { None } from "@core";

export type Option<T1> = Some<T1> | None;
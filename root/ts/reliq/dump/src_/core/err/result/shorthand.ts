import { Result } from "@root";
import { Option } from "@root";

export const ok = Result.ok;
export const err = Result.err;
export const wrap = Result.wrap;
export const wrapAsync = Result.wrapAsync;
export const flag = Option.wrap;
export const flagAsync = Option.wrapAsync;
export const some = Option.some;
export const none = Option.none;
import type { MathErrorCode } from "./math_error_code";
import type { Error } from "@error";

export type MathError = Error<MathErrorCode, [context: ]>;
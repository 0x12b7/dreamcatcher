import type { FloatLike } from "@root";
import { isFloat } from "@root";

export function unwrapFloatLike(v: FloatLike): number {
    return isFloat(v) ? v.unwrap() : v;
}
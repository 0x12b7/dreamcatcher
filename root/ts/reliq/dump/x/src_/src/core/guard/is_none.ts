import type { None } from "@root";
import { isBrand } from "@root";

export function isNone(unknown: unknown): unknown is None {
    return isBrand(unknown, "None");
}
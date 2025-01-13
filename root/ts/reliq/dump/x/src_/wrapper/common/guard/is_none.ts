import type { None } from "@root";
import { isBranded } from "@root";

export function isNone(unknown: unknown): unknown is None {
    return isBranded(unknown, "None");
}
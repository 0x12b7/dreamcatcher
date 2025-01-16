import type { Vec } from "@root";
import { isIndex } from "@root";
import { isMutableCollection } from "@root";
import { isSequence } from "@root";
import { isSpan } from "@root";
import { isPolymorph } from "@root";

export function isVec(v: unknown): v is Vec<unknown> {
    if (
        isIndex(v)
        && isMutableCollection(v)
        && isSequence(v)
        && isSpan(v)
        && isPolymorph(v)
    ) return true;
    else return false;
}
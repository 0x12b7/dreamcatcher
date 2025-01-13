import type { Option } from "@root";
import { isSome } from "@root";
import { isNone } from "@root";

function isOption(unknown: unknown): unknown is Option<unknown> {
    return isSome(unknown) || isNone(unknown);
}

export { isOption };
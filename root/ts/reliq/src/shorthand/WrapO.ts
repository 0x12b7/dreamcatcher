import type { Function } from "@root";
import { Option } from "@root";

export function wrapO<T>(op: Function<void, T>): Option<T> {
    return Option.wrap(op);
}
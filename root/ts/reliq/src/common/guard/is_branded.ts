import type { Branded } from "@root";
import type { TypeGuard } from "@root";

export function isBranded<T1 extends string>(unknown: unknown, type: T1): unknown is Branded<T1> {
    let guard: TypeGuard<Branded<T1>> = (unknown: unknown): unknown is Branded<T1> => {
        return unknown !== null
            && unknown !== undefined
            && typeof unknown === "object"
            && "type" in unknown
            && typeof unknown.type === "function"
            && typeof unknown.type() === "string"
            && unknown.type() === type;
    };
    return guard(unknown);
}
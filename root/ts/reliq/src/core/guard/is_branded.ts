import type { Branded } from "@root";
import type { TypeGuard } from "@root";

/**
 * ***Brief***
 * A utility function to check if an `unknown` value conforms to a specific branded type.
 * 
 * ***Warning***
 * Be cautious about brand collisions that may occur if multiple modules 
 * or contexts define similar branded types.
 */
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
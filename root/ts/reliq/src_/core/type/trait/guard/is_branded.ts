import type { Branded } from "@core";
import type { TypeGuard } from "@core";

/**
 * ***Brief***
 * A utility function to check if an `unknown` value conforms to a specific branded type.
 * 
 * ***Warning***
 * Be cautious about brand collisions that may occur if multiple modules 
 * or contexts define similar branded types.
 */
export function isBranded<T1 extends string>(unknown: unknown): unknown is Branded<any>;
export function isBranded<T1 extends string>(unknown: unknown, type: T1): unknown is Branded<T1>;
export function isBranded<T1 extends string>(
    p0: unknown,
    p1?: T1
): p0 is Branded<T1> {
    let unknown: unknown = p0;
    let guard: TypeGuard<Branded<T1>> = (unknown: unknown): unknown is Branded<T1> => {
        let match: boolean =
            unknown !== null
            && unknown !== undefined
            && typeof unknown === "object"
            && "type" in unknown
            && typeof unknown.type === "function"
            && typeof unknown.type() === "string";
        if (match === false) return false;
        if (p1 !== undefined) {
            let type: T1 = p1;
            match =
                match
                && (unknown as any).type() === type;
        }
        return match;
    };
    return guard(unknown);
}
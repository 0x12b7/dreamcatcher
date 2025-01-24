import type { BrandedStruct } from "@root";
import type { TypeGuard } from "@root";

export function isBrandedStruct<T1 extends string>(unknown: unknown): unknown is BrandedStruct<any>;
export function isBrandedStruct<T1 extends string>(unknown: unknown, type: T1): unknown is BrandedStruct<T1>;
export function isBrandedStruct<T1 extends string>(
    p0: unknown,
    p1?: T1
): p0 is BrandedStruct<T1> {
    let unknown: unknown = p0;
    let guard: TypeGuard<BrandedStruct<T1>> = (unknown: unknown): unknown is BrandedStruct<T1> => {
        let match: boolean =
            unknown !== null
            && unknown !== undefined
            && typeof unknown === "object"
            && "type" in unknown
            && typeof unknown.type === "string";
        if (match === false) return false;
        if (p1 !== undefined) {
            let type: T1 = p1;
            match =
                match
                && (unknown as any).type === type;
        }
        return match;
    };
    return guard(unknown);
}
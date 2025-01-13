import { type Branded } from "@root";
import { type Wrapper } from "@root";

export type Unsafe = 
    & Branded<"UNSAFE"> 
    & Wrapper<unknown>
    & {
    val(): unknown;
    validate(): boolean;      
};

export function Unsafe(): Unsafe;
export function Unsafe(_unknown: unknown): Unsafe;
export function Unsafe(_0?: unknown): Unsafe {
    let _x: unknown;

    /** @constructor */ {
        _x = _0 ?? null;
        return { type, unwrap };
    }

    function type(): "UNSAFE" {
        return "UNSAFE";
    }

    function unwrap(): unknown {
        return _x;
    }
}
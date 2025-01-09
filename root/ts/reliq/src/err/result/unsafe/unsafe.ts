import { type Branded } from "@root";
import { type Wrapper } from "@root";

export type Unsafe = 
    & Branded<"UNSAFE"> 
    & Wrapper<unknown>;

export function Unsafe(): Unsafe;
export function Unsafe(_x: unknown): Unsafe;
export function Unsafe(
    _args0?: unknown
): Unsafe {
    let _x: unknown;

    /** @constructor */ {
        _args0 ??= undefined;
        _x = _args0;
        return { type, unwrap };
    }

    function type(): "UNSAFE" {
        return "UNSAFE";
    }

    function unwrap(): unknown {
        return _x;
    }
}
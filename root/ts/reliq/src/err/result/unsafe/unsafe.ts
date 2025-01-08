import type { Wrapper } from "@root";
import type { Branded } from "@root";

export type Unsafe = 
    & Branded<"UNSAFE"> 
    & Wrapper<unknown>;

export function Unsafe(_v: unknown): Unsafe {
    /** @constructor */ {
        return { type, unwrap };
    }

    function type(): "UNSAFE" {
        return "UNSAFE";
    }

    function unwrap(): unknown {
        return _v;
    }
}
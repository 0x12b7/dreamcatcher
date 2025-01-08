import type { Wrapper } from "@root";

export type Unsafe = Wrapper<unknown>;

export function Unsafe(_v: unknown): Unsafe {
    /** @constructor */ {
        return { unwrap };
    }

    function unwrap(): unknown {
        return _v;
    }
}
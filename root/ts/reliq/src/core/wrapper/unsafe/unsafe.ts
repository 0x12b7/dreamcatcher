import type { Wrapper } from "@root";
import type { ParsableWrapper } from "@root";
import type { TypeGuard } from "@root";
import type { Option } from "@root";
import { Some } from "@root";
import { None } from "@root";
import { toString as toString0 } from "@root";

export type Unsafe =
    & Wrapper<unknown>
    & ParsableWrapper;

export function Unsafe(_value: unknown): Unsafe {
    /** @constructor */ {
        return {
            unlock,
            parse,
        };
    }

    function unlock(): unknown {
        return _value;
    }

    function parse<T1>(guard: TypeGuard<T1>): Option<T1> {
        if (!guard(unlock())) return None;
        return Some((unlock() as T1));
    }
}
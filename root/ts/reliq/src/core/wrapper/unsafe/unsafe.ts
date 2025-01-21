import type { Wrapper } from "@root";
import type { Parsable } from "@root";
import type { TypeGuard } from "@root";
import type { Option } from "@root";
import { Some } from "@root";
import { None } from "@root";
import { toString as toString0 } from "@root";

export type Unsafe =
    & Wrapper<unknown>
    & Parsable;

export function Unsafe(_value: unknown): Unsafe {
    /** @constructor */ {
        return {
            unwrap,
            parse,
        };
    }

    function unwrap(): unknown {
        return _value;
    }

    function parse<T1>(guard: TypeGuard<T1>): Option<T1> {
        if (!guard(unwrap())) return None;
        return Some((unwrap() as T1));
    }
}
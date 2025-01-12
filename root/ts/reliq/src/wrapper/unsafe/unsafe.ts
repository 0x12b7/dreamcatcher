import type { Branded } from "@root";
import type { Wrapper } from "@root";
import type { Parsable } from "@root";
import type { TypeGuard } from "@root";
import type { Option } from "@root";
import { Some } from "@root";
import { None } from "@root";
import { toString as toStringUtil } from "@root";

export type Unsafe =
    & Branded<"Unsafe">
    & Wrapper<unknown>
    & Parsable
    & {
    toString(): string;
};

export function Unsafe(_value: unknown): Unsafe {
    /** @constructor */ {
        return {
            type,
            unwrap,
            parse,
            toString
        };
    }

    function type(): "Unsafe" {
        return "Unsafe";
    }

    function unwrap(): unknown {
        return _value;
    }

    function parse<T1>(guard: TypeGuard<T1>): Option<T1> {
        if (!guard(unwrap())) return None;
        return Some((unwrap() as T1));
    }

    function toString(): string {
        return type() + "(" + toStringUtil(unwrap()) + ")";
    }
}
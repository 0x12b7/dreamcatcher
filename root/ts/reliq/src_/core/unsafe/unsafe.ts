import { type Wrapper } from "@core";
import { type Parsable } from "@core";
import { type TypeGuard } from "@core";
import { type Option } from "@core";
import { Some } from "@core";
import { None } from "@core";

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
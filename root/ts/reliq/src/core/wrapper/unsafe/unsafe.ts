import {
    type Branded,
    type Wrapper,
    type Parsable,
    type Serializable,
    type TypeGuard,
    type Option,
    Some,
    None,
    StringHandler
} from "@root";

export type Unsafe =
    & Branded<"Unsafe">
    & Wrapper<unknown>
    & Parsable
    & Serializable;

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
        return `${ type() } (${ StringHandler().toString(unwrap())} )`;
    }
}
import type { RecoveryWrapper } from "@root";
import type { Parsable } from "@root";
import type { TypeGuard } from "@root";
import type { Option } from "@root";
import { Some } from "@root";
import { None } from "@root";

export type Unsafe =
    & RecoveryWrapper<unknown>
    & Parsable;

export function Unsafe(_value: unknown): Unsafe {
    {
        return { inspect, parse };
    }

    function inspect(): unknown {
        return _value;
    }

    function parse<T1>(guard: TypeGuard<T1>): Option<T1> {
        if (!guard(inspect())) return None;
        return Some((inspect() as T1));
    }
}
import type { DynWrapper } from "@performance";
import type { W } from "@root";
import { Some } from "@root";

export type Alloc<T1> =
    & DynWrapper<T1>
    & UnlockedWrapper<T1>
    & Some<T1>;

/**
 * ***Brief***
 * The allocated state of an allocated resource.
 */
export function Alloc<T1>(_value: T1, _dyn: DynWrapper<T1>): Alloc<T1> {
    /** @constructor */ {
        return { ... Some(_value), ... _dyn };
    }
}
import type { DynWrapper } from "@performance";
import { None } from "@core"

export type DeAlloc<T1> = 
    & DynWrapper<T1>
    & None;

/**
 * ***Brief***
 * The deallocated state of an allocated resource.
 */
export function DeAlloc<T1>(_dyn: DynWrapper<T1>): DeAlloc<T1> {
    /** @constructor */ {
        return { ... None, ... _dyn };
    }
}
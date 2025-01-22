import type { Some } from "@root";
import type { DynWrapper } from "@root";
import type { UnlockedWrapper } from "@root";

export type Alloc<T1> =
    & DynWrapper
    & UnlockedWrapper<T1>
    & Some<T1>
    & {
    deAlloc(): void;
};
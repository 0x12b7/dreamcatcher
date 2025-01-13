import type { Wrapper } from "@root";

export type FallbackWrapper<T1> = 
    & Wrapper<T1>
    & {
    unwrapOr<T2>(fallback: T2): T2;
};
import type { Wrapper } from "@root";

export type P<T1> = 
    & Wrapper<T1>
    & {
    deAlloc(): void;
};
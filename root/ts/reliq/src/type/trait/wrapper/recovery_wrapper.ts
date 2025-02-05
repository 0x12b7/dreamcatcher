import type { Wrapper } from "@root";

export type RecoveryWrapper<T1> = 
    & Omit<Wrapper<T1>, "unwrap">
    & {
    inspect(): T1;
};
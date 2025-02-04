import type { Wrapper } from "@core";

export type RecoverableWrapper<T1> = 
    & Omit<Wrapper<T1>, "unwrap">
    & {

};
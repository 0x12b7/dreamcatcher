import {
    type Wrapper
} from "@core";

export type ValidatedWrapper<T1> = 
    & Wrapper<T1>
    & {
    unwrapSafely(): T1;
};
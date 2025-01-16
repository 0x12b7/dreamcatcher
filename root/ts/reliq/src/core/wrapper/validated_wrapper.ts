import {
    type Wrapper
} from "@root";

export type ValidatedWrapper<T1> = 
    & Wrapper<T1>
    & {
    unwrapSafely(): T1;
};
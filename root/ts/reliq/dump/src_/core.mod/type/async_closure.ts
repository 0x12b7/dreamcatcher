import {
    type Closure
} from "@core";

export type AsyncClosure<T1 extends Array<unknown>, T2> = Closure<T1, T2>;
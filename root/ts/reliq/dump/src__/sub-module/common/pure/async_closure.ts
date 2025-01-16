import {
    type Closure
} from "@common";

export type AsyncClosure<T1 extends Array<unknown>, T2> = Closure<T1, T2>;
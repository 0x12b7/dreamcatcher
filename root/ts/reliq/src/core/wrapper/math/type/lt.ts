import {
    type AtTerminus,
    type Eq,
    type Sub
} from "@root";

export type Lt<T1 extends number, T2 extends number> = 
    AtTerminus<T1, T2> extends true
        ? Eq<T1, T2> extends true
            ? false
            : (T1 extends 0 ? true : false)
        : Lt<Sub<T1, 1>, Sub<T2, 1>>;
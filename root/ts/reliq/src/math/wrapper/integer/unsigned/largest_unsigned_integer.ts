import type { UnsignedInteger } from "@root";
import type { U8 } from "@root";
import type { U16 } from "@root";
import type { U32 } from "@root";
import type { U64 } from "@root";
import type { U128 } from "@root";
import type { U256 } from "@root";
import type { U } from "@root";

type LargestUnsignedInteger<T1 extends UnsignedInteger, T2 extends UnsignedInteger> =
    T1 extends T2    ? T1 :
    T1 extends U     ? T1 :
    T2 extends U     ? T2 :
    T1 extends U256  ? T1 :
    T2 extends U256  ? T2 :
    T1 extends U128  ? T1 :
    T2 extends U128  ? T2 :
    T1 extends U64   ? T1 :
    T2 extends U64   ? T2 :
    T1 extends U32   ? T1 :
    T2 extends U32   ? T2 :
    T1 extends U16   ? T1 :
    T2 extends U16   ? T2 :
    T1 extends U8    ? T1 :
    T2 extends U8    ? T2 :
    never;

export type { LargestUnsignedInteger };
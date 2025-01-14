import type { SignedInteger } from "@root";
import type { I8 } from "@root";
import type { I16 } from "@root";
import type { I32 } from "@root";
import type { I64 } from "@root";
import type { I128 } from "@root";
import type { I256 } from "@root";
import type { I } from "@root";

type LargestSignedInteger<T1 extends SignedInteger, T2 extends SignedInteger> =
    T1 extends T2    ? T1 :
    T1 extends I     ? T1 :
    T2 extends I     ? T2 :
    T1 extends I256  ? T1 :
    T2 extends I256  ? T2 :
    T1 extends I128  ? T1 :
    T2 extends I128  ? T2 :
    T1 extends I64   ? T1 :
    T2 extends I64   ? T2 :
    T1 extends I32   ? T1 :
    T2 extends I32   ? T2 :
    T1 extends I16   ? T1 :
    T1 extends I16   ? T2 :
    T1 extends I8    ? T1 :
    T1 extends I8    ? T2 :
    never;

export type { LargestSignedInteger };
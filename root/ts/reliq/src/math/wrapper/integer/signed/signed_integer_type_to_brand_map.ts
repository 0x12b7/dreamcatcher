import type { SignedInteger } from "@root";
import type { I8 } from "@root";
import type { I16 } from "@root";
import type { I32 } from "@root";
import type { I64 } from "@root";
import type { I128 } from "@root";
import type { I256 } from "@root";
import type { I } from "@root";

type SignedIntegerTypeToBrandMap<T1 extends SignedInteger> =
    T1 extends I8    ? "I8" :
    T1 extends I16   ? "I16" :
    T1 extends I32   ? "I32" :
    T1 extends I64   ? "I64" :
    T1 extends I128  ? "I128" :
    T1 extends I256  ? "I256" :
    T1 extends I     ? "I" :
    never;

export type { SignedIntegerTypeToBrandMap };
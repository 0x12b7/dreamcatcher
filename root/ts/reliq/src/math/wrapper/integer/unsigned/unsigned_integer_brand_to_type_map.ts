import type { UnsignedIntegerBrand } from "@root";
import type { U8 } from "@root";
import type { U16 } from "@root";
import type { U32 } from "@root";
import type { U64 } from "@root";
import type { U128 } from "@root";
import type { U256 } from "@root";
import type { U } from "@root";

type UnsignedIntegerBrandToTypeMap<T1 extends UnsignedIntegerBrand> =
    T1 extends "U8"      ? U8 :
    T1 extends "U16"     ? U16 :
    T1 extends "U32"     ? U32 :
    T1 extends "U64"     ? U64 :
    T1 extends "U128"    ? U128 :
    T1 extends "U256"    ? U256 :
    T1 extends "U"       ? U :
    never;

export type { UnsignedIntegerBrandToTypeMap };
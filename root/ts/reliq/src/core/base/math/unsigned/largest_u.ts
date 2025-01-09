import type { ULike } from "@root"; 
import { U } from "@root";
import { U8 } from "@root";
import { U16 } from "@root";
import { U32 } from "@root";
import { U64 } from "@root";
import { U128 } from "@root";
import { U256 } from "@root";

export type LargestU<T1 extends ULike, T2 extends ULike> =
    T1 extends U ? U :
    T2 extends U ? U :
    T1 extends U256 ? T1 :
    T2 extends U256 ? T2 :
    T1 extends U128 ? T1 :
    T2 extends U128 ? T2 :
    T1 extends U64 ? T1 :
    T2 extends U64 ? T2 :
    T1 extends U32 ? T1 :
    T2 extends U32 ? T2 :
    T1 extends U16 ? T1 : 
    T2 extends U16 ? T2 :
    T1 extends U8 ? T1 : 
    T2 extends U8 ? T2 :
    T1;
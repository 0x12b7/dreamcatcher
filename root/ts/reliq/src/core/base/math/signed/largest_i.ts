import { type ILike } from "@root";
import { type I } from "@root";
import { type I8 } from "@root";
import { type I16 } from "@root";
import { type I32 } from "@root";
import { type I64 } from "@root";
import { type I128 } from "@root";
import { type I256 } from "@root";

export type LargestI<T1 extends ILike, T2 extends ILike> = 
    T1 extends I     ? I :
    T2 extends I     ? I :
    T1 extends I256  ? T1 :
    T2 extends I256  ? T2 :
    T1 extends I128  ? T1 :
    T2 extends I128  ? T2 :
    T1 extends I64   ? T1 :
    T2 extends I64   ? T2 :
    T1 extends I32   ? T1 :
    T2 extends I32   ? T2 :
    T1 extends I16   ? T1 :
    T2 extends I16   ? T2 :
    T1 extends I8    ? T1 :
    T2 extends I8    ? T2 :
    T1;

let x: LargestI<I128, I8>;
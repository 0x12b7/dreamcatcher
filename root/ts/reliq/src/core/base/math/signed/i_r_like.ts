import { type MathErrorCode } from "@root";
import { type MathError } from "@root";
import { type IR } from "@root";
import { type I8R } from "@root";
import { type I16R } from "@root";


export type IRLike<T1 extends MathErrorCode> = 
    | IR<T1>
    | I8R<T1>
    | I16R<T1>;
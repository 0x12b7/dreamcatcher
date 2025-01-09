import type { ILike } from "@root";
import type { ULike } from "@root";
import type { LargestI } from "@root";
import type { LargestU } from "@root";
import type { NumberLike } from "@root";
import { Float } from "@root";
import { Result } from "@root";
import { MathError } from "@root";
import { isWrapper } from "@root";

export type Math = {
    eq(v0: Float, v1: Float): boolean;
    eq(v0: ILike, v1: ILike): boolean;
    eq(v0: ULike, v1: ULike): boolean;
    eq(v0: number, v1: number): boolean;
    eq(v0: bigint, v1: bigint): boolean;
    lt(v0: Float, v1: Float): boolean;
    lt(v0: ILike, v1: ILike): boolean;
    lt(v0: ULike, v1: ULike): boolean;
    lt(v0: number, v1: number): boolean;
    lt(v0: bigint, v1: bigint): boolean;
    gt(v0: Float, v1: Float): boolean;
    gt(v0: ILike, v1: ILike): boolean;
    gt(v0: ULike, v1: ULike): boolean;
    gt(v0: number, v1: number): boolean;
    gt(v0: bigint, v1: bigint): boolean;
    lteq(v0: Float, v1: Float): boolean;
    lteq(v0: ILike, v1: ILike): boolean;
    lteq(v0: ULike, v1: ULike): boolean;
    lteq(v0: number, v1: number): boolean;
    lteq(v0: bigint, v1: bigint): boolean;
    gteq(v0: Float, v1: Float): boolean;
    gteq(v0: ILike, v1: ILike): boolean;
    gteq(v0: ULike, v1: ULike): boolean;
    gteq(v0: number, v1: number): boolean;
    gteq(v0: bigint, v1: bigint): boolean;
    add(v0: Float, v1: Float): Result<Float, MathError>;
    add<T1 extends ILike, T2 extends ILike>(v0: T1, v1: T2): Result<LargestI<T1, T2>, MathError>;
    add<T1 extends ULike, T2 extends ULike>(v0: T1, v1: T2): Result<LargestU<T1, T2>, MathError>;
    add(v0: number, v1: number): Result<number, MathError>;
    add(v0: bigint, v1: bigint): Result<bigint, MathError>;
    sub(v0: Float, v1: Float): Result<Float, MathError>;
    sub<T1 extends ILike, T2 extends ILike>(v0: T1, v1: T2): Result<LargestI<T1, T2>, MathError>;
    sub<T1 extends ULike, T2 extends ULike>(v0: T1, v1: T2): Result<LargestU<T1, T2>, MathError>;
    sub(v0: number, v1: number): Result<number, MathError>;
    sub(v0: bigint, v1: bigint): Result<bigint, MathError>;
    mul(v0: Float, v1: Float): Result<Float, MathError>;
    mul<T1 extends ILike, T2 extends ILike>(v0: T1, v1: T2): Result<LargestI<T1, T2>, MathError>;
    mul<T1 extends ULike, T2 extends ULike>(v0: T1, v1: T2): Result<LargestU<T1, T2>, MathError>;
    mul(v0: number, v1: number): Result<number, MathError>;
    mul(v0: bigint, v1: bigint): Result<bigint, MathError>;  
    div(v0: Float, v1: Float): Result<Float, MathError>;
    div<T1 extends ILike, T2 extends ILike>(v0: T1, v1: T2): Result<LargestI<T1, T2>, MathError>;
    div<T1 extends ULike, T2 extends ULike>(v0: T1, v1: T2): Result<LargestU<T1, T2>, MathError>;
    div(v0: number, v1: number): Result<number, MathError>;
    div(v0: bigint, v1: bigint): Result<bigint, MathError>;
    pow(v0: Float, v1: Float): Result<Float, MathError>;
    pow<T1 extends ILike, T2 extends ILike>(v0: T1, v1: T2): Result<LargestI<T1, T2>, MathError>;
    pow<T1 extends ULike, T2 extends ULike>(v0: T1, v1: T2): Result<LargestU<T1, T2>, MathError>;
    pow(v0: number, v1: number): Result<number, MathError>;
    pow(v0: bigint, v1: bigint): Result<bigint, MathError>;
    mod(v0: Float, v1: Float): Result<Float, MathError>;
    mod<T1 extends ILike, T2 extends ILike>(v0: T1, v1: T2): Result<LargestI<T1, T2>, MathError>;
    mod<T1 extends ULike, T2 extends ULike>(v0: T1, v1: T2): Result<LargestU<T1, T2>, MathError>;
    mod(v0: number, v1: number): Result<number, MathError>;
    mod(v0: bigint, v1: bigint): Result<bigint, MathError>;
    sqrt(v0: Float, v1: Float): Result<Float, MathError>;
    sqrt<T1 extends ILike, T2 extends ILike>(v0: T1, v1: T2): Result<LargestI<T1, T2>, MathError>;
    sqrt<T1 extends ULike, T2 extends ULike>(v0: T1, v1: T2): Result<LargestU<T1, T2>, MathError>;
    sqrt(v0: number, v1: number): Result<number, MathError>;
    sqrt(v0: bigint, v1: bigint): Result<bigint, MathError>;
};

export const Math: Math = (() => {
    /** @constructor */ {
        return {
            eq
        };
    }

    function eq(v0: Float, v1: Float): boolean;
    function eq(v0: ILike, v1: ILike): boolean;
    function eq(v0: ULike, v1: ULike): boolean;
    function eq(v0: number, v1: number): boolean;
    function eq(v0: bigint, v1: bigint): boolean;
    function eq(
        v0: NumberLike,
        v1: NumberLike
    ): boolean {
        if (isWrapper(v0) && isWrapper(v1)) v0.unwrap() === v1.unwrap();
        else if (typeof v0 === "number" && typeof v1 === "number") return v0 === v1;
        else if (typeof v0 === "bigint" && typeof v1 === "bigint") return v0 === v1;
        else return false;
        return false;
    }

    function lt(v0: Float, v1: Float): boolean;
    function lt(v0: ILike, v1: ILike): boolean;
    function lt(v0: ULike, v1: ULike): boolean;
    function lt(v0: number, v1: number): boolean;
    function lt(v0: number, v1: number): boolean;
    function lt(
        v0: NumberLike,
        v1: NumberLike
    ): boolean {
        if (isWrapper(v0) && isWrapper(v1)) v0.unwrap() < v1.unwrap();
        else if (typeof v0 === "number" && typeof v1 === "number") return v0 < v1;
        else if (typeof v0 === "bigint" && typeof v1 === "bigint") return v0 < v1;
        else return false;
        return false;
    }

    function gt(v0: Float, v1: Float): boolean;
    function gt(v0: ILike, v1: ILike): boolean;
    function gt(v0: ULike, v1: ULike): boolean;
    function gt(v0: number, v1: number): boolean;
    function gt(v0: bigint, v1: bigint): boolean;
    function gt(
        v0: NumberLike,
        v1: NumberLike
    ): boolean {
        if (isWrapper(v0) && isWrapper(v1)) v0.unwrap() > v1.unwrap();
        else if (typeof v0 === "number" && typeof v1 === "number") return v0 > v1;
        else if (typeof v0 === "bigint" && typeof v1 === "bigint") return v0 > v1;
        else return false;
        return false;
    }

    function lteq(v0: Float, v1: Float): boolean;
    function lteq(v0: ILike, v1: ILike): boolean;
    function lteq(v0: ULike, v1: ULike): boolean;
    function lteq(v0: number, v1: number): boolean;
    function lteq(v0: bigint, v1: bigint): boolean;
    function lteq(
        v0: NumberLike,
        v1: NumberLike
    ): boolean {
        if (isWrapper(v0) && isWrapper(v1)) v0.unwrap() <= v1.unwrap();
        else if (typeof v0 === "number" && typeof v1 === "number") return v0 <= v1;
        else if (typeof v0 === "bigint" && typeof v1 === "bigint") return v0 <= v1;
        else return false;
        return false;
    }

    function gteq(v0: Float, v1: Float): boolean;
    function gteq(v0: ILike, v1: ILike): boolean;
    function gteq(v0: ULike, v1: ULike): boolean;
    function gteq(v0: number, v1: number): boolean;
    function gteq(v0: bigint, v1: bigint): boolean;
    function gteq(
        v0: NumberLike,
        v1: NumberLike
    ): boolean {
        if (isWrapper(v0) && isWrapper(v1)) v0.unwrap() > v1.unwrap();
        else if (typeof v0 === "number" && typeof v1 === "number") return v0 > v1;
        else if (typeof v0 === "bigint" && typeof v1 === "bigint") return v0 > v1;
        else return false;
        return false;
    }

    function add(v0: Float, v1: Float): Result<Float, MathError>;
    function add<T1 extends ILike, T2 extends ILike>(v0: T1, v1: T2): Result<LargestI<T1, T2>, MathError>;
    function add<T1 extends ULike, T2 extends ULike>(v0: T1, v1: T2): Result<LargestU<T1, T2>, MathError>;
    function add(v0: number, v1: number): Result<number, MathError>;
    function add(v0: bigint, v1: bigint): Result<bigint, MathError>;
    function add(
        v0: NumberLike,
        v1: NumberLike
    ): Result<NumberLike, MathError> {
        if (isWrapper(v0) && isWrapper(v1))
    }
})();
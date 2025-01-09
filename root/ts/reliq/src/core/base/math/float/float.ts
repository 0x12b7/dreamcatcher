import * as Root from "@root";

export type Float =
    & Root.Branded<"FLOAT">
    & Root.Wrapper<number>
    & Exclude<Root.Polymorph<unknown>, "toArray">
    & Exclude<Root.Span<unknown>, "at">
    & {
    eq(x: Float): boolean;
    lt(x: Float): boolean;
    gt(x: Float): boolean;
    lteq(x: Float): boolean;
    gteq(x: Float): boolean;
    add(x: Float): Root.Result<Float, Root.MathError<"MATH.ERR_ARITHMETIC_OVERF">>;
    sub(x: Float): Root.Result<Float, Root.MathError<"MATH.ERR_ARITHMETIC_UNDER">>;
    mul(x: Float): Root.Result<Float, Root.MathError<"MATH.ERR_ARITHMETIC_OVERF" | "MATH.ERR_ARITHMETIC_UNDER">>;
    div(x: Float): Root.Result<Float, Root.MathError<"MATH.ERR_ARITHMETIC_OVERF" | "MATH.ERR_ARITHMETIC_UNDER" | "MATH.ERR_DIVISION_BY_ZERO">>;
};

export function Float(_n: Float): Float;
export function Float(_n: Root.ILike): Float;
export function Float(_n: Root.ULike): Float;
export function Float(_n: number): Float;
export function Float(_n: bigint): Float;
export function Float(
    _args0: Root.NumberLike
): Float {

}

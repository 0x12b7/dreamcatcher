type MultiAdd<
N extends number, A extends number, I extends number
> = I extends 0 ? A : MultiAdd<N, Add<N, A>, Subtract<I, 1>>;
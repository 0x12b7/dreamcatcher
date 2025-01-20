

type Length<T extends any[]> = 
    T extends { length: infer L } ? L : never;


    type BuildTuple<L extends number, T extends any[] = []> = 
    T extends { length: L } ? T : BuildTuple<L, [...T, any]>;

    let length: Length<[number, string, string, boolean]>; // `4`
    let tuple: BuildTuple<5>; // `[any, any, any, any, any]`

type Add<A extends number, B extends number> = 
    Length<[...BuildTuple<A>, ...BuildTuple<B>]>;
type Subtract<A extends number, B extends number> = 
    BuildTuple<A> extends [...(infer U), ...BuildTuple<B>]
        ? Length<U>
        : never;


        let five: Add<3, 900>; // `5`
        let one: Subtract<3, 2>; // `1`

        type MultiAdd<
        N extends number, A extends number, I extends number
    > = I extends 0 ? A : MultiAdd<N, Add<N, A>, Subtract<I, 1>>;

    type EQ<A, B> =
    A extends B
        ? (B extends A ? true : false)
        : false;
type AtTerminus<A extends number, B extends number> = 
    A extends 0
        ? true
        : (B extends 0 ? true : false);
type LT<A extends number, B extends number> = 
    AtTerminus<A, B> extends true
        ? EQ<A, B> extends true
            ? false
            : (A extends 0 ? true : false)
        : LT<Subtract<A, 1>, Subtract<B, 1>>;
type MultiSub<
    N extends number, D extends number, Q extends number
> = LT<N, D> extends true
    ? Q
    : MultiSub<Subtract<N, D>, D, Add<Q, 1>>;


    type Multiply<A extends number, B extends number> = 
    MultiAdd<A, 0, B>;
type Divide<A extends number, B extends number> = 
    MultiSub<A, B, 0>;
type Modulo<A extends number, B extends number> = 
    LT<A, B> extends true ? A : Modulo<Subtract<A, B>, B>;



    let twentyEight: Multiply<7, 4>; // `28`
    let onek: Divide<7, 2>; // `1`
    let three: Modulo<7, 4>; // `3`



    type IsPositive<N extends number> = 
    `${N}` extends `-${number}` ? false : true;
type IsWhole<N extends number> = 
    `${N}` extends `${number}.${number}` ? false : true;



    type IsValid<N extends number> = 
    IsPositive<N> extends true
        ? (IsWhole<N> extends true ? true : false)
        : false;
type AreValid<A extends number, B extends number> = 
    IsValid<A> extends true
        ? (IsValid<B> extends true ? true : false)
        : false;


        type SafeAdd<A extends number, B extends number> = 
        AreValid<A, B> extends true ? Add<A, B> : never;
    type SafeSubtract<A extends number, B extends number> = 
        AreValid<A, B> extends true ? Subtract<A, B> : never;
    type SafeMultiply<A extends number, B extends number> = 
        AreValid<A, B> extends true ? Multiply<A, B> : never;
    type SafeDivide<A extends number, B extends number> = 
        AreValid<A, B> extends true ? Divide<A, B> : never;
    type SafeModulo<A extends number, B extends number> = 
        AreValid<A, B> extends true ? Modulo<A, B> : never;


let xyz: SafeAdd<999, 999>;



type OkRange =
    | 0 | 1 | 2 | 3
    | 4 | 5 | 6 | 7
    | 8 | 9
    | 10 | 11 | 12 | 13
    | 14 | 15 | 16 | 17
    | 18 | 19 | 20 | 21
    | 22 | 23 | 24 | 25

let xY: I<200> 

type I<T1 extends OkRange> = T1;





function I<T1 extends bigint = 256n, T2 extends bigint = 256n>(_value: bigint, _min?: T1, _max?: T2): I<T1, T2> {

}

I(7800000000n, 0n, 8n);

I(64n, 64n);

let x = I(0n, 0n, 100n);

x.add(1n);
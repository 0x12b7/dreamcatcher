import { B as BrandedStruct, a as Branded, F as Function, R as Result, b as OkValOfAll, E as ErrValOfAll, C as Closure, U as Unsafe, A as AsyncClosure, O as Ok, c as Err, d as Option, S as Some } from '../error-Cjs7K6Np.cjs';
export { i as ErrValOf, N as None, j as OkValOf, e as OptionHandler, P as Parsable, h as ResultHandler, g as SomeValOf, f as SomeValOfAll, T as TypeGuard, W as Wrapper } from '../error-Cjs7K6Np.cjs';

/**
 * ***Brief***
 * A trait representing objects that can be serialized to a string format.
 *
 * ***Example***
 * ```ts
 *  let foo: Serializable;
 *  let fooRepresentation: string = foo.toString();
 * ```
 */
type Serializable = {
    /**
     * ***Brief***
     * Converts the implementing object to its string representation.
     *
     * ***Example***
     * ```ts
     *  let foo: Serializable;
     *  let fooRepresentation: string = foo.toString();
     * ```
     */
    toString(): string;
};

/**
 * ***Brief***
 * A utility function to check if an `unknown` value conforms to a specific branded type.
 *
 * ***Warning***
 * Be cautious about brand collisions that may occur if multiple modules
 * or contexts define similar branded types.
 */
declare function isBrandedStruct<T1 extends string>(unknown: unknown): unknown is BrandedStruct<any>;
declare function isBrandedStruct<T1 extends string>(unknown: unknown, type: T1): unknown is BrandedStruct<T1>;

/**
 * ***Brief***
 * A utility function to check if an `unknown` value conforms to a specific branded type.
 *
 * ***Warning***
 * Be cautious about brand collisions that may occur if multiple modules
 * or contexts define similar branded types.
 */
declare function isBranded<T1 extends string>(unknown: unknown): unknown is Branded<any>;
declare function isBranded<T1 extends string>(unknown: unknown, type: T1): unknown is Branded<T1>;

/**
 * ***Brief***
 * A value that can either be resolved immediately or asynchronously.
 */
type MaybeAsync<T1> = Promise<T1> | T1;

/**
 * ***Brief***
 * A type alias for a `Function` that supports asynchronous operation.
 *
 * ***Example***
 * ```ts
 *  const fetch: AsyncFunction<string, unknown> = async (url: string) => /// ...;
 * ```
 */
type AsyncFunction<T1, T2> = Function<T1, Promise<T2>>;

declare const allR: <T1 extends Array<Result<unknown, unknown>>>(results: T1) => Result<OkValOfAll<T1>, ErrValOfAll<T1>[number]>;
declare const anyR: <T1 extends Array<Result<unknown, unknown>>>(results: T1) => Result<OkValOfAll<T1>[number], ErrValOfAll<T1>>;
declare const wrap: <T1, T2, T3 extends Array<T2>>(task: Closure<T3, T1>, ...payload: T3) => Result<T1, Unsafe>;
declare const wrapAsync: <T1, T2, T3 extends Array<T2>>(task: AsyncClosure<T3, T1>, ...payload: T3) => Promise<Result<T1, Unsafe>>;

type OkOfAll<T1 extends Array<Result<unknown, unknown>>> = {
    [T2 in keyof T1]: T1[T2] extends Ok<unknown> ? OkOf<T1[T2]> : never;
};

type OkOf<T1 extends Result<unknown, unknown>> = T1 extends Ok<infer T2> ? Ok<T2> : never;

type ErrOfAll<T1 extends Array<Result<unknown, unknown>>> = {
    [T2 in keyof T1]: T1[T2] extends Err<unknown> ? ErrOf<T1[T2]> : never;
};

type ErrOf<T1 extends Result<unknown, unknown>> = T1 extends Err<infer T2> ? Err<T2> : never;

declare const flag: typeof Option.flag;
declare const allO: typeof Option.all;
declare const anyO: typeof Option.any;

type SomeOfAll<T1 extends Array<Option<unknown>>> = {
    [T2 in keyof T1]: T1[T2] extends Some<unknown> ? SomeOf<T1[T2]> : never;
};

type SomeOf<T1 extends Option<unknown>> = T1 extends Some<infer T2> ? Some<T2> : never;

export { AsyncClosure, type AsyncFunction, Branded, BrandedStruct, Closure, Err, type ErrOf, type ErrOfAll, ErrValOfAll, Function, type MaybeAsync, Ok, type OkOf, type OkOfAll, OkValOfAll, Option, Result, type Serializable, Some, type SomeOf, type SomeOfAll, Unsafe, allO, allR, anyO, anyR, flag, isBranded, isBrandedStruct, wrap, wrapAsync };

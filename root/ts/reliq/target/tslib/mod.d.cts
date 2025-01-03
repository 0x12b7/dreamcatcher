type AssertionHandler = {
    some<T1>(v: null): false;
    some<T1>(v: undefined): false;
    some<T1>(v: T1 | null | undefined): v is Exclude<T1, null | undefined>;
    some<T1>(v: T1 | null | undefined): v is Exclude<T1, null | undefined>;
    none<T1>(v: null): true;
    none<T1>(v: undefined): true;
    none<T1>(v: T1 | null | undefined): v is null | undefined;
    none<T1>(v: T1 | null | undefined): v is null | undefined;
    mapErr<T1 extends string, T2>(e: unknown, errcode: T1, handler: Closure<[], T2>): Option<T2>;
};
declare const Assert: AssertionHandler;
declare function assert<T1 extends string>(condition: boolean, errcode: T1): asserts condition;

declare function panic<T1 extends string>(msg: T1): never;

declare function require<T1 extends string>(condition: boolean, errcode: T1): asserts condition;

type Restorable<T1> = {
    get(): T1;
    mut(handler: Function<T1, void>): void;
    mutAsync(handler: AsyncFunction<T1, void>): Promise<void>;
};
declare function Restorable<T1>(_v: T1): Restorable<T1>;

declare const mapErr: <T1 extends string, T2>(e: unknown, errcode: T1, handler: Closure<[], T2>) => Option<T2>;

type ResultHandler = {
    match(unknown: unknown): unknown is Result<unknown, unknown>;
    ok(unknown: unknown): unknown is Ok<unknown>;
    err(unknown: unknown): unknown is Err<unknown>;
    all<T1 extends Array<Result<unknown, unknown>>>(...wrappers: T1): Result<OkValOfAll<T1>, ErrValOfAll<T1>[number]>;
    any<T1 extends Array<Result<unknown, unknown>>>(...wrappers: T1): Result<OkValOfAll<T1>[number], ErrValOfAll<T1>>;
    wrap<T1, T2, T3 extends Array<T2>>(op: Closure<T3, T1>, ...args: T3): Result<T1, Unsafe<unknown>>;
    wrapAsync<T1 extends Promise<unknown>, T2, T3 extends Array<T2>>(op: AsyncClosure<T3, T1>, ...args: T3): Promise<Result<Awaited<T1>, Unsafe<unknown>>>;
};

type Result<T1, T2> = Ok<T1> | Err<T2>;
declare const Result: ResultHandler;

type ErrOfAll<T extends Array<Result<unknown, unknown>>> = {
    [k in keyof T]: T[k] extends Err<unknown> ? ErrOf<T[k]> : never;
};

type ErrOf<T1 extends Result<unknown, unknown>> = T1 extends Err<infer T2> ? Err<T2> : never;

type ErrValOfAll<T extends Array<Result<unknown, unknown>>> = {
    [k in keyof T]: T[k] extends Err<unknown> ? ErrValOf<T[k]> : never;
};

type ErrValOf<T extends Result<unknown, unknown>> = T extends Err<infer X> ? X : never;

type Err<T1> = {
    ok(): this is Ok<unknown>;
    err(): this is Err<T1>;
    val(): T1;
    stack(): string;
    expect(msg: string): never;
    expectErr(__: unknown): T1;
    unwrap(): never;
    unwrapOr<T2>(v: T2): T2;
    andThen(__: unknown): Err<T1>;
    map(__: unknown): Err<T1>;
    mapErr<T2>(op: Function<T1, T2>): Err<T2>;
    toOption(): Option<never>;
    toString(): string;
};
declare function Err<T1>(_v: T1): Err<T1>;

type None = {
    some(): this is Some<unknown>;
    none(): this is None;
    expect(msg: string): never;
    unwrap(): never;
    unwrapOr<X>(v: X): X;
    andThen(__: unknown): None;
    map(__: unknown): None;
    toResult<E>(e: E): Err<E>;
    toString(): string;
};
declare const None: None;

type OkOfAll<T extends Array<Result<unknown, unknown>>> = {
    [k in keyof T]: T[k] extends Ok<unknown> ? OkOf<T[k]> : never;
};

type OkOf<T extends Result<unknown, unknown>> = T extends Ok<infer X> ? Ok<X> : never;

type OkValOfAll<T extends Array<Result<unknown, unknown>>> = {
    [k in keyof T]: T[k] extends Ok<unknown> ? OkValOf<T[k]> : never;
};

type OkValOf<T extends Result<unknown, unknown>> = T extends Ok<infer X> ? X : never;

type Ok<T> = {
    ok(): this is Ok<T>;
    err(): this is Err<unknown>;
    val(): T;
    expect(__: unknown): T;
    expectErr(msg: string): never;
    unwrap(): T;
    unwrapOr(__: unknown): T;
    unwrapSafely(): T;
    andThen<X>(op: Function<T, Ok<X>>): Ok<X>;
    andThen<X>(op: Function<T, Err<X>>): Result<T, X>;
    andThen<X, Y>(op: Function<T, Result<X, Y>>): Result<X, Y>;
    andThen<X, Y>(op: Function<T, Result<X, Y>>): Result<X, Y>;
    map<X>(op: Function<T, X>): Ok<X>;
    mapErr(__: unknown): Ok<T>;
    toOption(): Option<T>;
    toString(): string;
};
declare function Ok<T>(_v: T): Ok<T>;

type OptionHandler = {
    match(unknown: unknown): unknown is Option<unknown>;
    some(unknown: unknown): unknown is Some<unknown>;
    none(unknown: unknown): unknown is None;
    all<T1 extends Array<Option<unknown>>>(...wrappers: T1): Option<SomeValOfAll<T1>>;
    any<T1 extends Array<Option<unknown>>>(...wrappers: T1): Option<SomeValOfAll<T1>[number]>;
    wrap<T1, T2, T3 extends Array<T2>>(op: Closure<T3, T1>, ...args: T3): Option<T1>;
    wrapAsync<T1, T2, T3 extends Array<T2>>(op: AsyncClosure<T3, T1>, ...args: T3): Promise<Option<T1>>;
};

type Option<T> = Some<T> | None;
declare const Option: OptionHandler;

type SomeOfAll<T extends Array<Option<unknown>>> = {
    [k in keyof T]: T[k] extends Some<unknown> ? SomeOf<T[k]> : never;
};

type SomeOf<T extends Option<unknown>> = T extends Some<infer X> ? Some<X> : never;

type SomeValOfAll<T extends Array<Option<unknown>>> = {
    [k in keyof T]: T[k] extends Some<unknown> ? SomeValOf<T[k]> : never;
};

type SomeValOf<T extends Option<unknown>> = T extends Some<infer X> ? X : never;

type Some<T> = {
    some(): this is Some<T>;
    none(): this is None;
    val(): T;
    expect(__: unknown): T;
    unwrap(): T;
    unwrapOr(__: unknown): T;
    unwrapSafely(): T;
    andThen<X>(op: Function<T, Option<X>>): Option<X>;
    map<X>(op: Function<T, X>): Some<X>;
    toResult<E>(e: E): Ok<T>;
    toString(): string;
};
declare function Some<T>(_v: T): Some<T>;

type Unsafe<T = unknown> = {
    unwrap(): T;
};
declare function Unsafe<T = unknown>(_v: T): Unsafe<T>;

type AsyncClosure<T extends Array<unknown>, X> = Closure<T, X>;

type AsyncFunction<T, X> = Function<T, Promise<X>>;

type Closure<T extends Array<unknown>, X> = (...args: T) => X;

type Function<T, X> = (args: T) => X;

type MaybeAsync<T> = Promise<T> | T;

type Maybe<T> = T | null | void | undefined;

declare function copy<T>(v: T): T;

declare function toString(v: unknown): string;

declare const ok: (unknown: unknown) => unknown is Ok<unknown>;
declare const err: (unknown: unknown) => unknown is Err<unknown>;
declare const wrap: <T1, T2, T3 extends Array<T2>>(op: Closure<T3, T1>, ...args: T3) => Result<T1, Unsafe<unknown>>;
declare const wrapAsync: <T1 extends Promise<unknown>, T2, T3 extends Array<T2>>(op: AsyncClosure<T3, T1>, ...args: T3) => Promise<Result<Awaited<T1>, Unsafe<unknown>>>;
declare const flag: <T1, T2, T3 extends Array<T2>>(op: Closure<T3, T1>, ...args: T3) => Option<T1>;
declare const flagAsync: <T1, T2, T3 extends Array<T2>>(op: AsyncClosure<T3, T1>, ...args: T3) => Promise<Option<T1>>;
declare const some: (unknown: unknown) => unknown is Some<unknown>;
declare const none: (unknown: unknown) => unknown is None;

export { Assert, type AssertionHandler, type AsyncClosure, type AsyncFunction, type Closure, Err, type ErrOf, type ErrOfAll, type ErrValOf, type ErrValOfAll, type Function, type Maybe, type MaybeAsync, None, Ok, type OkOf, type OkOfAll, type OkValOf, type OkValOfAll, Option, type OptionHandler, Restorable, Result, type ResultHandler, Some, type SomeOf, type SomeOfAll, type SomeValOf, type SomeValOfAll, Unsafe, assert, copy, err, flag, flagAsync, mapErr, none, ok, panic, require, some, toString, wrap, wrapAsync };

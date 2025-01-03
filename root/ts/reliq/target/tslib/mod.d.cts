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

type ErrOfAll<T1 extends Array<Result<unknown, unknown>>> = {
    [T2 in keyof T1]: T1[T2] extends Err<unknown> ? ErrOf<T1[T2]> : never;
};

type ErrOf<T1 extends Result<unknown, unknown>> = T1 extends Err<infer T2> ? Err<T2> : never;

type ErrValOfAll<T1 extends Array<Result<unknown, unknown>>> = {
    [T2 in keyof T1]: T1[T2] extends Err<unknown> ? ErrValOf<T1[T2]> : never;
};

type ErrValOf<T1 extends Result<unknown, unknown>> = T1 extends Err<infer T2> ? T2 : never;

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
    unwrapOr<T1>(v: T1): T1;
    andThen(__: unknown): None;
    map(__: unknown): None;
    toResult<T1>(e: T1): Err<T1>;
    toString(): string;
};
declare const None: None;

type OkOfAll<T1 extends Array<Result<unknown, unknown>>> = {
    [T2 in keyof T1]: T1[T2] extends Ok<unknown> ? OkOf<T1[T2]> : never;
};

type OkOf<T1 extends Result<unknown, unknown>> = T1 extends Ok<infer T2> ? Ok<T2> : never;

type OkValOfAll<T1 extends Array<Result<unknown, unknown>>> = {
    [T2 in keyof T1]: T1[T2] extends Ok<unknown> ? OkValOf<T1[T2]> : never;
};

type OkValOf<T1 extends Result<unknown, unknown>> = T1 extends Ok<infer T2> ? T2 : never;

type Ok<T1> = {
    ok(): this is Ok<T1>;
    err(): this is Err<unknown>;
    val(): T1;
    expect(__: unknown): T1;
    expectErr(msg: string): never;
    unwrap(): T1;
    unwrapOr(__: unknown): T1;
    unwrapSafely(): T1;
    andThen<T2>(op: Function<T1, Ok<T2>>): Ok<T2>;
    andThen<T2>(op: Function<T1, Err<T2>>): Result<T1, T2>;
    andThen<T2, T3>(op: Function<T1, Result<T2, T3>>): Result<T2, T3>;
    andThen<T2, T3>(op: Function<T1, Result<T2, T3>>): Result<T2, T3>;
    map<T2>(op: Function<T1, T2>): Ok<T2>;
    mapErr(__: unknown): Ok<T1>;
    toOption(): Option<T1>;
    toString(): string;
};
declare function Ok<T1>(_v: T1): Ok<T1>;

type OptionHandler = {
    match(unknown: unknown): unknown is Option<unknown>;
    some(unknown: unknown): unknown is Some<unknown>;
    none(unknown: unknown): unknown is None;
    all<T1 extends Array<Option<unknown>>>(...wrappers: T1): Option<SomeValOfAll<T1>>;
    any<T1 extends Array<Option<unknown>>>(...wrappers: T1): Option<SomeValOfAll<T1>[number]>;
    wrap<T1, T2, T3 extends Array<T2>>(op: Closure<T3, T1>, ...args: T3): Option<T1>;
    wrapAsync<T1, T2, T3 extends Array<T2>>(op: AsyncClosure<T3, T1>, ...args: T3): Promise<Option<T1>>;
};

type Option<T1> = Some<T1> | None;
declare const Option: OptionHandler;

type SomeOfAll<T1 extends Array<Option<unknown>>> = {
    [T2 in keyof T1]: T1[T2] extends Some<unknown> ? SomeOf<T1[T2]> : never;
};

type SomeOf<T1 extends Option<unknown>> = T1 extends Some<infer T2> ? Some<T2> : never;

type SomeValOfAll<T1 extends Array<Option<unknown>>> = {
    [T2 in keyof T1]: T1[T2] extends Some<unknown> ? SomeValOf<T1[T2]> : never;
};

type SomeValOf<T1 extends Option<unknown>> = T1 extends Some<infer T2> ? T2 : never;

type Some<T1> = {
    some(): this is Some<T1>;
    none(): this is None;
    val(): T1;
    expect(__: unknown): T1;
    unwrap(): T1;
    unwrapOr(__: unknown): T1;
    unwrapSafely(): T1;
    andThen<T2>(op: Function<T1, Option<T2>>): Option<T2>;
    map<T2>(op: Function<T1, T2>): Some<T2>;
    toResult<T2>(__: T2): Ok<T1>;
    toString(): string;
};
declare function Some<T1>(_v: T1): Some<T1>;

type Unsafe<T1 = unknown> = {
    unwrap(): T1;
};
declare function Unsafe<T1 = unknown>(_v: T1): Unsafe<T1>;

type AsyncClosure<T1 extends Array<unknown>, T2> = Closure<T1, T2>;

type AsyncFunction<T1, T2> = Function<T1, Promise<T2>>;

type Closure<T1 extends Array<unknown>, T2> = (...args: T1) => T2;

type Function<T1, T2> = (args: T1) => T2;

type MaybeAsync<T1> = Promise<T1> | T1;

type Maybe<T1> = T1 | null | void | undefined;

declare function copy<T1>(v: T1): T1;

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

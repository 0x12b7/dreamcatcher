declare function assert<T extends string>(condition: boolean, errcode: T): asserts condition;

declare function mapErr<T extends string, X>(e: unknown, errcode: T, handler: Function<void, X>): Maybe<X>;

declare function none<T>(v: undefined): true;
declare function none<T>(v: null): true;
declare function none<T>(v: Maybe<T>): v is null | undefined;

declare function panic<T extends string>(msg: T): never;

declare function require<T extends string>(condition: boolean, errcode: T): asserts condition;

type RestorableOperation<T> = Function<T, void>;
type RestorableAsyncOperation<T> = AsyncFunction<T, void>;
type Restorable<T> = {
    get(): T;
    mut(handler: RestorableOperation<T>): void;
    mutAsync(handler: RestorableAsyncOperation<T>): Promise<void>;
};
declare function Restorable<T>(_v: T): Restorable<T>;

declare function some<T>(v: undefined): false;
declare function some<T>(v: null): false;
declare function some<T>(v: Maybe<T>): v is Exclude<Maybe<T>, null | undefined>;

type AsyncClosure<T extends Array<unknown>, X> = Closure<T, X>;

type AsyncFunction<T, X> = Function<T, Promise<X>>;

type Err<E> = {
    ok(): this is Ok<unknown>;
    err(): this is Err<E>;
    val(): E;
    stack(): string;
    expect(msg: string): never;
    expectErr(__: unknown): E;
    unwrap(): never;
    unwrapOr<X>(v: X): X;
    andThen(__: unknown): Err<E>;
    map(__: unknown): Err<E>;
    mapErr<X>(op: Function<E, X>): Err<X>;
    toOption(): Option<never>;
    toString(): string;
};
declare function Err<E>(_v: E): Err<E>;

type ErrOf<T extends Result<unknown, unknown>> = T extends Err<infer X> ? Err<X> : never;

type ErrOfAll<T extends Array<Result<unknown, unknown>>> = {
    [k in keyof T]: T[k] extends Err<unknown> ? ErrOf<T[k]> : never;
};

type ErrValOf<T extends Result<unknown, unknown>> = T extends Err<infer X> ? X : never;

type ErrValOfAll<T extends Array<Result<unknown, unknown>>> = {
    [k in keyof T]: T[k] extends Err<unknown> ? ErrValOf<T[k]> : never;
};

type Maybe<T> = T | null | void | undefined;

type MaybeAsync<T> = Promise<T> | T;

declare function copy<T>(v: T): T;

type Closure<T extends Array<unknown>, X> = (...args: T) => X;

type Function<T, X> = (args: T) => X;

declare function toString(v: unknown): string;

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

type OkOf<T extends Result<unknown, unknown>> = T extends Ok<infer X> ? Ok<X> : never;

type OkOfAll<T extends Array<Result<unknown, unknown>>> = {
    [k in keyof T]: T[k] extends Ok<unknown> ? OkOf<T[k]> : never;
};

type OkValOf<T extends Result<unknown, unknown>> = T extends Ok<infer X> ? X : never;

type OkValOfAll<T extends Array<Result<unknown, unknown>>> = {
    [k in keyof T]: T[k] extends Ok<unknown> ? OkValOf<T[k]> : never;
};

type Option<T> = Some<T> | None;
declare const Option: OptionHandler;

type OptionHandler = {
    isOption(unknown: unknown): unknown is Option<unknown>;
    isSome(unknown: unknown): unknown is Some<unknown>;
    isNone(unknown: unknown): unknown is None;
    wrap<T>(op: Function<void, T>): Option<T>;
    wrapAsync<T>(op: AsyncFunction<void, T>): Promise<Option<T>>;
    unwrapAll<T extends Array<Option<unknown>>>(...wrappers: T): Option<SomeValOfAll<T>>;
    unwrapAny<T extends Array<Option<unknown>>>(...wrappers: T): Option<SomeValOfAll<T>[number]>;
};

type Result<T, E> = Ok<T> | Err<E>;
declare const Result: ResultHandler;

type ResultHandler = {
    isResult(unknown: unknown): unknown is Result<unknown, unknown>;
    isOk(unknown: unknown): unknown is Ok<unknown>;
    isErr(unknown: unknown): unknown is Err<unknown>;
    wrap<T, E = unknown>(op: Function<void, T>): Result<T, E>;
    wrapAsync<T, E = unknown>(op: AsyncFunction<void, T>): Promise<Result<T, E>>;
    unwrapAll<T extends Array<Result<unknown, unknown>>>(...wrappers: T): Result<OkValOfAll<T>, ErrValOfAll<T>[number]>;
    unwrapAny<T extends Array<Result<unknown, unknown>>>(...wrappers: T): Result<OkValOfAll<T>[number], ErrValOfAll<T>>;
};

declare function wrapAsyncOption<T>(op: AsyncFunction<void, T>): Promise<Option<T>>;

declare function wrapAsyncResult<T, E = unknown>(op: AsyncFunction<void, T>): Promise<Result<T, E>>;

declare function wrapOption<T>(op: Function<void, T>): Option<T>;

declare function wrapResult<T, E = unknown>(op: Function<void, T>): Result<T, E>;

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

type SomeOf<T extends Option<unknown>> = T extends Some<infer X> ? Some<X> : never;

type SomeOfAll<T extends Array<Option<unknown>>> = {
    [k in keyof T]: T[k] extends Some<unknown> ? SomeOf<T[k]> : never;
};

type SomeValOf<T extends Option<unknown>> = T extends Some<infer X> ? X : never;

type SomeValOfAll<T extends Array<Option<unknown>>> = {
    [k in keyof T]: T[k] extends Some<unknown> ? SomeValOf<T[k]> : never;
};

export { type AsyncClosure, type AsyncFunction, type Closure, Err, type ErrOf, type ErrOfAll, type ErrValOf, type ErrValOfAll, type Function, type Maybe, type MaybeAsync, None, Ok, type OkOf, type OkOfAll, type OkValOf, type OkValOfAll, Option, type OptionHandler, Restorable, type RestorableAsyncOperation, type RestorableOperation, Result, type ResultHandler, Some, type SomeOf, type SomeOfAll, type SomeValOf, type SomeValOfAll, assert, copy, mapErr, none, panic, require, some, toString, wrapAsyncOption, wrapAsyncResult, wrapOption, wrapResult };

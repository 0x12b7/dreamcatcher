type AsyncClosure<T1 extends Array<unknown>, T2> = Closure<T1, T2>;

type AsyncFunction<T1, T2> = Function$1<T1, Promise<T2>>;

declare function clone<T1>(data: T1): Result<T1, DomError>;

type Closure<T1 extends Array<unknown>, T2> = (...payload: T1) => T2;

type Function$1<T1, T2> = (payload: T1) => T2;

type MaybeAsync<T1> = Promise<T1> | T1;

declare function toString(unknown: unknown): string;

type TypeGuard<T1> = (instance: unknown) => instance is T1;

declare function isBranded<T1 extends string>(unknown: unknown, type: T1): unknown is Branded<T1>;

type Branded<T1 extends string> = {
    type(): T1;
};

type Clonable<T1> = {
    clone(): T1;
};

type Displayable = {
    toString(): string;
};

type Parsable = {
    parse<T1>(guard: TypeGuard<T1>): Option<T1>;
};

type Error<T1 extends string, T2 extends Array<unknown> = []> = {
    code: T1;
    message: Option<string>;
    payload: Option<T2>;
};
declare function Error<T1 extends string, T2 extends Array<unknown> = []>(_this: Error<T1, T2>): Error<T1, T2>;

type DomErrorCode = "DOM.ERR_INDEX_SIZE" | "DOM.ERR_HIERARCHY_REQUEST" | "DOM.ERR_WRONG_DOCUMENT" | "DOM.ERR_INVALID_CHARACTER" | "DOM.ERR_NO_MODIFICATION_ALLOWED" | "DOM.ERR_NOT_FOUND" | "DOM.ERR_NOT_SUPPORTED" | "DOM.ERR_INVALID_STATE" | "DOM.ERR_ATTRIBUTE_IN_USE" | "DOM.ERR_SYNTAX" | "DOM.ERR_INVALID_MODIFICATION" | "DOM.ERR_NAMESPACE" | "DOM.ERR_INVALID_ACCESS" | "DOM.ERR_TYPE_MISMATCH" | "DOM.ERR_SECURITY" | "DOM.ERR_NETWORK" | "DOM.ERR_ABORT" | "DOM.ERR_URL_MISMATCH" | "DOM.ERR_QUOTA_EXCEEDED" | "DOM.ERR_TIMEOUT" | "DOM.ERR_INVALID_NODE_TYPE" | "DOM.ERR_DATA_CLONE" | "DOM.ERR_ENCODING" | "DOM.ERR_NOT_READABLE" | "DOM.ERR_UNKNOWN" | "DOM.ERR_CONSTRAINT" | "DOM.ERR_DATA" | "DOM.ERR_TRANSACTION_INACTIVE" | "DOM.ERR_READ_ONLY" | "DOM.ERR_VERSION" | "DOM.ERR_OPERATION" | "DOM.ERR_NOT_ALLOWED";

type DomError = Error<DomErrorCode>;
declare function DomError(): DomError;
declare function DomError(e: DOMException): DomError;

type LegacyDomErrorCode = 1 | 3 | 4 | 5 | 7 | 8 | 9 | 11 | 12 | 13 | 14 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25;

type LegacyDomErrorName = "EncodingError" | "NotReadableError" | "UnknownError" | "ConstraintError" | "DataError" | "TransactionInactiveError" | "ReadOnlyError" | "VersionError" | "OperationError" | "NotAllowedError";

declare const DomErrorCodeToCodeMap: Record<LegacyDomErrorCode, DomErrorCode>;

declare const DomErrorNameToCodeMap: Record<LegacyDomErrorName, DomErrorCode>;

declare function panic<T1 extends string>(message: T1): never;
declare function panic<T1 extends string>(message: T1, scope: Function): never;

type WrapperBrand = OptionBrand | ResultBrand | UnsafeBrand;

declare function isErr(unknown: unknown): unknown is Err<unknown>;

declare function isNone(unknown: unknown): unknown is None;

declare function isOk(unknown: unknown): unknown is Ok<unknown>;

declare function isOption(unknown: unknown): unknown is Option<unknown>;

declare function isResult(unknown: unknown): unknown is Result<unknown, unknown>;

declare function isSome(unknown: unknown): unknown is Some<unknown>;

declare function isWrapper<T1>(unknown: unknown): unknown is Wrapper<T1>;

type FallbackWrapper<T1> = Wrapper<T1> & {
    unwrapOr<T2>(fallback: T2): T2;
};

type ValidatedWrapper<T1> = Wrapper<T1> & {
    unwrapSafely(): T1;
};

type Wrapper<T1> = {
    unwrap(): T1;
};

type ResultAndOptionBrandToWrapperMap<T1 extends "Some" | "None" | "Ok" | "Err", T2> = T1 extends "Some" ? _Some<T2> : T1 extends "None" ? _None : T1 extends "Ok" ? _Ok<T2> : T1 extends "Err" ? _Err<T2> : never;
type _Some<T1> = Branded<"Some"> & Wrapper<T1> & ValidatedWrapper<T1> & Displayable & {
    some(): this is Some<T1>;
    none(): this is None;
    value(): T1;
    expect(__: unknown): T1;
    unwrapOr(__: unknown): T1;
    and<T2>(op: Function$1<T1, Option<T2>>): Option<T2>;
    map<T2>(op: Function$1<T1, T2>): Some<T2>;
    toResult(__: unknown): Ok<T1>;
};
type _None = Branded<"None"> & Wrapper<never> & FallbackWrapper<never> & Displayable & {
    some(): this is Some<unknown>;
    none(): this is None;
    expect(message: string): never;
    and(__: unknown): None;
    map(__: unknown): None;
    toResult<T1>(e: T1): Err<T1>;
};
type _Ok<T1> = Branded<"Ok"> & Wrapper<T1> & ValidatedWrapper<T1> & Displayable & {
    ok(): this is Ok<T1>;
    err(): this is Err<unknown>;
    val(): T1;
    expect(__: unknown): T1;
    expectErr(message: string): never;
    unwrapOr(__: unknown): T1;
    and<T2>(operation: Function$1<T1, Ok<T2>>): Ok<T2>;
    and<T2>(operation: Function$1<T1, Err<T2>>): Result<T1, T2>;
    and<T2, T3>(operation: Function$1<T1, Result<T2, T3>>): Result<T2, T3>;
    map<T2>(operation: Function$1<T1, T2>): Ok<T2>;
    mapErr(__: unknown): Ok<T1>;
    toOption(): Option<T1>;
};
type _Err<T1> = Branded<"Err"> & Wrapper<T1> & FallbackWrapper<T1> & Displayable & {
    ok(): this is Ok<unknown>;
    err(): this is Err<T1>;
    val(): T1;
    stack(): string;
    expect(message: string): never;
    expectErr(__: unknown): T1;
    and(__: unknown): Err<T1>;
    map(__: unknown): Err<T1>;
    mapErr<T2>(operation: Function$1<T1, T2>): Err<T2>;
    toOption(): Option<never>;
};

type AsyncOption<T1> = Promise<Option<T1>>;

type OptionBrand = "Some" | "None";

type Option<T1> = Some<T1> | None;

type None = ResultAndOptionBrandToWrapperMap<"None", never>;
declare const None: None;

type SomeOfAll<T1 extends Array<Option<unknown>>> = {
    [T2 in keyof T1]: T1[T2] extends Some<unknown> ? SomeOf<T1[T2]> : never;
};

type SomeOf<T1 extends Option<unknown>> = T1 extends Some<infer T2> ? Some<T2> : never;

type SomeValOfAll<T1 extends Array<Option<unknown>>> = {
    [T2 in keyof T1]: T1[T2] extends Some<unknown> ? SomeValOf<T1[T2]> : never;
};

type SomeValOf<T1 extends Option<unknown>> = T1 extends Some<infer T2> ? T2 : never;

type Some<T1> = ResultAndOptionBrandToWrapperMap<"Some", T1>;
declare function Some<T1>(_value: T1): Some<T1>;

type AsyncResult<T1, T2> = Promise<Result<T1, T2>>;

type ResultBrand = "Ok" | "Err";

type ResultHandler = {
    all<T1 extends Array<Result<unknown, unknown>>>(...wrappers: T1): Result<OkValOfAll<T1>, ErrValOfAll<T1>[number]>;
    any<T1 extends Array<Result<unknown, unknown>>>(...wrappers: T1): Result<OkValOfAll<T1>[number], ErrValOfAll<T1>>;
    wrap<T1, T2, T3 extends Array<T2>>(operation: Closure<T3, T1>, ...payload: T3): Result<T1, Unsafe>;
    wrapAsync<T1 extends Promise<unknown>, T2, T3 extends Array<T2>>(operation: AsyncClosure<T3, T1>, ...payload: T3): Promise<Result<Awaited<T1>, Unsafe>>;
};
declare const ResultHandler: ResultHandler;

type Result<T1, T2> = Ok<T1> | Err<T2>;

type ErrOfAll<T1 extends Array<Result<unknown, unknown>>> = {
    [T2 in keyof T1]: T1[T2] extends Err<unknown> ? ErrOf<T1[T2]> : never;
};

type ErrOf<T1 extends Result<unknown, unknown>> = T1 extends Err<infer T2> ? Err<T2> : never;

type ErrValOfAll<T1 extends Array<Result<unknown, unknown>>> = {
    [T2 in keyof T1]: T1[T2] extends Err<unknown> ? ErrValOf<T1[T2]> : never;
};

type ErrValOf<T1 extends Result<unknown, unknown>> = T1 extends Err<infer T2> ? T2 : never;

type Err<T1> = ResultAndOptionBrandToWrapperMap<"Err", T1>;
declare function Err<T1>(_value: T1): Err<T1>;

type OkOfAll<T1 extends Array<Result<unknown, unknown>>> = {
    [T2 in keyof T1]: T1[T2] extends Ok<unknown> ? OkOf<T1[T2]> : never;
};

type OkOf<T1 extends Result<unknown, unknown>> = T1 extends Ok<infer T2> ? Ok<T2> : never;

type OkValOfAll<T1 extends Array<Result<unknown, unknown>>> = {
    [T2 in keyof T1]: T1[T2] extends Ok<unknown> ? OkValOf<T1[T2]> : never;
};

type OkValOf<T1 extends Result<unknown, unknown>> = T1 extends Ok<infer T2> ? T2 : never;

type Ok<T1> = ResultAndOptionBrandToWrapperMap<"Ok", T1>;
declare function Ok<T1>(_value: T1): Ok<T1>;

type AsyncUnsafe = Promise<Unsafe>;

type UnsafeBrand = "Unsafe";

type Unsafe = Branded<"Unsafe"> & Wrapper<unknown> & Parsable & {
    toString(): string;
};
declare function Unsafe(_value: unknown): Unsafe;

export { type AsyncClosure, type AsyncFunction, type AsyncOption, type AsyncResult, type AsyncUnsafe, type Branded, type Clonable, type Closure, type Displayable, DomError, type DomErrorCode, DomErrorCodeToCodeMap, DomErrorNameToCodeMap, Err, type ErrOf, type ErrOfAll, type ErrValOf, type ErrValOfAll, Error, type FallbackWrapper, type Function$1 as Function, type LegacyDomErrorCode, type LegacyDomErrorName, type MaybeAsync, None, Ok, type OkOf, type OkOfAll, type OkValOf, type OkValOfAll, type Option, type OptionBrand, type Parsable, type Result, type ResultAndOptionBrandToWrapperMap, type ResultBrand, ResultHandler, Some, type SomeOf, type SomeOfAll, type SomeValOf, type SomeValOfAll, type TypeGuard, Unsafe, type UnsafeBrand, type ValidatedWrapper, type Wrapper, type WrapperBrand, clone, isBranded, isErr, isNone, isOk, isOption, isResult, isSome, isWrapper, panic, toString };

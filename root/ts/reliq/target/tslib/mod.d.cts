type AsyncClosure<T1 extends Array<unknown>, T2> = Closure<T1, T2>;

type AsyncFunction<T1, T2> = Function<T1, Promise<T2>>;

type Closure<T1 extends Array<unknown>, T2> = (...payload: T1) => T2;

type Function<T1, T2> = (payload: T1) => T2;

type MaybeAsync<T1> = Promise<T1> | T1;

type TypeGuard<T1> = (unknown: unknown) => unknown is T1;

type Branded<T1 extends string> = {
    type(): T1;
};

type Displayable = {
    /**
     *
     * **Note**
     * Useful for debugging purposes.
     *
     * **Example**
     * ```typescript
     *  function Displayable(): Displayable {
     *      return { display };
     *
     *      function display(): void {
     *          return console.log("Hello World");
     *      }
     *  }
     *
     *  let value: Displayable = Displayable();
     *  value.display(); /// Hello World
     * ```
     */
    display(): void;
};

type Parsable = {
    parse<T1>(guard: TypeGuard<T1>): Option<T1>;
};

type Sequence<T1> = {
    at(position: bigint): Option<T1>;
    length(): bigint;
    concat(sequence: T1): T1;
    pop(): T1;
    push(item: T1): bigint;
    push(items: T1): bigint;
    shift(): T1;
    unshift(item: T1): bigint;
    unshift(...items: Array<T1>): bigint;
    slice(position: bigint): Option<T1>;
    slice(position: bigint, count: bigint): Option<T1>;
};

type Serializable = {
    toString(): string;
};

type RecoveryWrapper<T1> = Wrapper<T1> & {
    unwrapOr<T2>(fallback: T2): T2;
};

type ValidatedWrapper<T1> = Wrapper<T1> & {
    unwrapSafely(): T1;
};

type Wrapper<T1> = {
    unwrap(): T1;
};

type AsyncOption<T1> = Promise<Option<T1>>;

type OptionArray<T1> = Array<Option<T1>>;

type OptionBrand = "Some" | "None";

type OptionHandler = {
    /**
     * **NOTE**
     * - Returns `None` if **any** `Option` is `None`.
     *
     * @example
     *  let option0: Option<string> = Some("");
     *  let option1: Option<7> = Some(7);
     *  let option2: Option<5> = None;
     *  let newOption: Option<[string, 7]> = OptionHandler.all(option0, option1, option2);
     *  newOption.some(); /// false
     *  newOption.none(); /// true
     *
     * @example
     *  let option0: Option<string> = Some("");
     *  let option1: Option<7> = Some(7);
     *  let option2: Option<5> = Some(5);
     *  let newOption: Option<[string, 7, 5]> = OptionHandler.all(option0, option1, option2);
     *  newOption.some(); /// true
     *  newOption.none(); /// false
     *  newOption.map(values => {
     *      console.log(values); /// ["", 7, 5]
     *  });
     */
    all<T1 extends OptionArray<unknown>>(...options: T1): Option<SomeValOfAll<T1>>;
    /**
     * **NOTE**
     * - Returns the first successful `Some` value encountered.
     * - Returns `None` only if **all** options are `None`.
     *
     * @example
     * let option0: Option<string> = None;
     * let option1: Option<7> = None;
     * let option2: Option<5> = None;
     * let newOption: Option<never> = OptionHandler.any(option0, option1, option2);
     * newOption.some(); /// false
     * newOption.none(); /// true
     *
     * @example
     *  let option0: Option<string> = None;
     *  let option1: Option<7> = None;
     *  let option2: Option<5> = Some(5);
     *  let newOption: Option<5> = OptionHandler.any(option0, option1, option2);
     *  newOption.some() /// true
     *  newOption.none() /// false
     *  newOption.map(values => {
     *      console.log(value); /// 5
     *  });
     */
    any<T1 extends OptionArray<unknown>>(...options: T1): Option<SomeValOfAll<T1>[number]>;
};
declare const OptionHandler: OptionHandler;

/**
 * **NOTE**
 * Represents a wrapper that encapsulates an optional value.
 * - `Some<T1>` - The presence of a value of type `T1`.
 * - `None` - The absence of a value.
 *
 * **EXAMPLE**
 * ```typescript
 *  function foo(): Option<200> {
 *      if () return Some(200);
 *      return None;
 *  }
 *
 *  let option: Option<200> = foo();
 *  if (option.some()) {
 *      let value: 200 = option.unwrapSafely();
 *      /// ...
 *  }
 * ```
 */
type Option<T1> = Some<T1> | None;

type None = Branded<"None"> & RecoveryWrapper<never> & Serializable & Displayable & {
    some(): this is Some<unknown>;
    none(): this is None;
    expect(message: string): never;
    and(__: unknown): None;
    map(__: unknown): None;
    toResult<T1>(value: T1): Err<T1>;
};
declare const None: None;

type SomeOfAll<T1 extends Array<Option<unknown>>> = {
    [T2 in keyof T1]: T1[T2] extends Some<unknown> ? SomeOf<T1[T2]> : never;
};

type SomeOf<T1 extends Option<unknown>> = T1 extends Some<infer T2> ? Some<T2> : never;

type SomeValOfAll<T1 extends Array<Option<unknown>>> = {
    [T2 in keyof T1]: T1[T2] extends Some<unknown> ? SomeValOf<T1[T2]> : never;
};

type SomeValOf<T1 extends Option<unknown>> = T1 extends Some<infer T2> ? T2 : never;

type Some<T1> = Branded<"Some"> & ValidatedWrapper<T1> & Serializable & Displayable & {
    /**
     * **NOTE**
     * - `TypeGuard` to check if the value is of the type `Some`.
     * - Returns `true` because the current instance is `Some`.
     *
     * **EXAMPLE**
     * ```typescript
     *  let value: Some<number> = Some(20);
     *  value.some(); /// true
     * ```
     */
    some(): this is Some<T1>;
    /**
     *
     * **EXAMPLE**
     * ```typescript
     *  let value: Some<number> = Some(20);
     *  value.none(); /// false
     * ```
     */
    none(): this is None;
    /**
     * **Warning**
     * Unused method, present because of `Option` type inference.
     *
     */
    expect(__: unknown): T1;
    unwrapOr(__: unknown): T1;
    /**
     * **NOTE**
     * Applies an operation to the value contained in the `Some<T1>` if it exists,
     * returning a new `Option<T2>` resulting from the operation. If the current `Option`
     * is `None`, this operation will not be executed, and `None` will be returned.
     *
     * **Example**
     * ```typescript
     *  let value: Option<number> = Some(200);
     *  value
     *      .and(length => {
     *          if (length > 100) return Some("LARGE");
     *          return None;
     *      })
     *      .and(value => {
     *          console.log(value); /// LARGE
     *      });
     * ```
     */
    and<T2>(operation: Function<T1, Option<T2>>): Option<T2>;
    /**
     * **NOTE**
     * Transforms the value contained in the `Some<T1>` to a new value of type `T2` using the provided `operation`.
     * Returns a new `Some<T2>` containing the result of the transformation.
     * - If the `Option` is `None`, the transformation is not applied and `None` is returned.
     *
     */
    map<T2>(operation: Function<T1, T2>): Some<T2>;
    toResult(__: unknown): Ok<T1>;
};
declare function Some<T1>(_value: T1): Some<T1>;

type AsyncResult<T1, T2> = Promise<Result<T1, T2>>;

type ResultArray<T1, T2> = Array<Result<T1, T2>>;

type ResultBrand = "Ok" | "Err";

/**
 * **NOTE**
 * A util `class` to handle `Result`.
 */
type ResultHandler = {
    /**
     * **NOTE**
     *
     *
     * **OUTCOME**
     * Iterate through a `ResultArray` short circuit at the first `Err` or return
     * a `Tuple` of all successful values. Will return as a `Result`.
     *
     * @example
     * let r0: Result<number, "ERR_SOMETHING_WENT_WRONG_0">;
     * let r1: Result<string, "ERR_SOMETHING_WENT_WRONG_1">;
     * let r2: Result<500000, "ERR_SOMETHING_WENT_WRONG_2">;
     * let r: Result<[number, string, 500000], "ERR_SOMETHING_WENT_WRONG_0" | "ERR_SOMETHING_WENT_WRONG_1" | "ERR_SOMETHING_WENT_WRONG_2"> = ResultHandler.all(r0, r1, r2);
     */
    all<T1 extends ResultArray<unknown, unknown>>(...results: T1): Result<OkValOfAll<T1>, ErrValOfAll<T1>[number]>;
    /**
     * **OUTCOME**
     * Iterate through a `ResultArray` short circuit at the first `Ok` or return
     * a `Tuple` of all errors. Will return as a `Result`.
     *
     * @example
     *
     */
    any<T1 extends ResultArray<unknown, unknown>>(...results: T1): Result<OkValOfAll<T1>[number], ErrValOfAll<T1>>;
    /**
     * **OUTCOME**
     * Wrap an unsafe operation which may throw and wrap the `unknown` error
     * in an `Unsafe` wrapper.
     *
     * @example
     *  let exampleR: Result<number, Unsafe> = ResultHandler.wrap(() => {
     *      if () throw "ERR_SOMETHING_WENT_WRONG";
     *      return 500;
     *  });
     *  exampleR.mapErr(unsafe => {
     *      let stringO: Option<string> = unsafe.parse((unknown): unknown is string => {
     *          if (
     *              unknown !== null
     *              && unknown !== undefined
     *              && typeof unknown === "string"
     *          ) return true;
     *          else return false;
     *      });
     *      /// ...
     *  });
     */
    wrap<T1, T2, T3 extends Array<T2>>(operation: Closure<T3, T1>, ...payload: T3): Result<T1, Unsafe>;
    /**
     * **OUTCOME**
     * Wrap an unsafe async operation which may throw and wrap the `unknown` error
     * in an `Unsafe` wrapper.
     *
     * @example
     *  let exampleR: Result<number, Unsafe> = await ResultHandler.wrapAsync(async () => {
     *      /// Some async operation.
     *      if () throw "ERR_SOMETHING_WENT_WRONG";
     *      return 500;
     *  });
     *  exampleR.mapErr(unsafe => {
     *      let stringO: Option<string> = unsafe.parse((unknown): unknown is string => {
     *          if (
     *              unknown !== null
     *              && unknown !== undefined
     *              && typeof unknown === "string"
     *          ) return true;
     *          else return false;
     *      });
     *      /// ...
     *  });
     */
    wrapAsync<T1 extends Promise<unknown>, T2, T3 extends Array<T2>>(operation: AsyncClosure<T3, T1>, ...payload: T3): AsyncResult<Awaited<T1>, Unsafe>;
};
declare const ResultHandler: ResultHandler;

/**
 * **NOTE**
 * A wrapper that encapsulates either a success `Ok<T1>` or failure `Err<T2>`.
 *
 * **NOTE**
 * A `Result<T1, T2>` can be in one of two states.
 * - `Ok<T1>` - A successful result with a value of type `T1`.
 * - `Err<T2>` - A failure with an error or value of type `T2`.
 *
 * **EXAMPLE**
 * ```typescript
 *  function foo(): Result<200, 404> {
 *      if () return Ok(200);
 *      return Err(404);
 *  }
 *
 *  let result: Result<200, 404> = foo();
 *  if (result.ok()) {
 *      let value: 200 = result.unwrapSafely();
 *      /// ...
 *  }
 * ```
 */
type Result<T1, T2> = Ok<T1> | Err<T2>;

type ErrOfAll<T1 extends Array<Result<unknown, unknown>>> = {
    [T2 in keyof T1]: T1[T2] extends Err<unknown> ? ErrOf<T1[T2]> : never;
};

type ErrOf<T1 extends Result<unknown, unknown>> = T1 extends Err<infer T2> ? Err<T2> : never;

type ErrValOfAll<T1 extends Array<Result<unknown, unknown>>> = {
    [T2 in keyof T1]: T1[T2] extends Err<unknown> ? ErrValOf<T1[T2]> : never;
};

type ErrValOf<T1 extends Result<unknown, unknown>> = T1 extends Err<infer T2> ? T2 : never;

type Err<T1> = Branded<"Err"> & RecoveryWrapper<T1> & Serializable & Displayable & {
    ok(): this is Ok<unknown>;
    err(): this is Err<T1>;
    inspect(): T1;
    stack(): string;
    expect(message: string): never;
    expectErr(__: unknown): T1;
    and(__: unknown): Err<T1>;
    map(__: unknown): Err<T1>;
    mapErr<T2>(operation: Function<T1, T2>): Err<T2>;
    restore<T2>(operation: Function<T1, T2>): Ok<T2>;
    toOption(): Option<never>;
};
declare function Err<T1>(_value: T1): Err<T1>;

type OkOfAll<T1 extends Array<Result<unknown, unknown>>> = {
    [T2 in keyof T1]: T1[T2] extends Ok<unknown> ? OkOf<T1[T2]> : never;
};

type OkOf<T1 extends Result<unknown, unknown>> = T1 extends Ok<infer T2> ? Ok<T2> : never;

type OkValOfAll<T1 extends Array<Result<unknown, unknown>>> = {
    [T2 in keyof T1]: T1[T2] extends Ok<unknown> ? OkValOf<T1[T2]> : never;
};

type OkValOf<T1 extends Result<unknown, unknown>> = T1 extends Ok<infer T2> ? T2 : never;

type Ok<T1> = Branded<"Ok"> & ValidatedWrapper<T1> & Serializable & Displayable & {
    ok(): this is Ok<T1>;
    err(): this is Err<unknown>;
    expect(__: unknown): T1;
    expectErr(__: unknown): never;
    unwrapOr(__: unknown): T1;
    and<T2>(operation: Function<T1, Ok<T2>>): Ok<T2>;
    and<T2>(operation: Function<T1, Err<T2>>): Result<T1, T2>;
    and<T2, T3>(operation: Function<T1, Result<T2, T3>>): Result<T2, T3>;
    map<T2>(operation: Function<T1, T2>): Ok<T2>;
    mapErr(__: unknown): Ok<T1>;
    restore(__: unknown): Ok<T1>;
    /**
     *
     *
     * **Example**
     * ```
     *  let result: Result<200, 404>
     *      .toOption()
     *      .unwrap();
     * ```
     */
    toOption(): Option<T1>;
};
declare function Ok<T1>(_value: T1): Ok<T1>;

type AsyncUnsafe = Promise<Unsafe>;

type UnsafeBrand = "Unsafe";

type Unsafe = Branded<"Unsafe"> & Pick<Wrapper<unknown>, "unwrap"> & Parsable & {
    toString(): string;
};
declare function Unsafe(_value: unknown): Unsafe;

export { type AsyncClosure, type AsyncFunction, type AsyncOption, type AsyncResult, type AsyncUnsafe, type Branded, type Closure, type Displayable, Err, type ErrOf, type ErrOfAll, type ErrValOf, type ErrValOfAll, type Function, type MaybeAsync, None, Ok, type OkOf, type OkOfAll, type OkValOf, type OkValOfAll, type Option, type OptionArray, type OptionBrand, OptionHandler, type Parsable, type Result, type ResultArray, type ResultBrand, ResultHandler, type Sequence, type Serializable, Some, type SomeOf, type SomeOfAll, type SomeValOf, type SomeValOfAll, type TypeGuard, type UnsafeBrand };

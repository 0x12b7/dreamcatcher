/**
 * ***Brief***
 * A wrapper that encapsulates either a successful outcome `Ok<T1>` or a failure `Err<T2>`.
 *
 * ***Example***
 * ```ts
 *  function foo(): Result<200n, 404n> {
 *      if () return Ok(200n);
 *      return Err(404n);
 *  }
 *
 *  let result: Result<200n, 404n> = foo();
 *  if (result.ok()) {
 *      let value: 200n = result.unlock();
 *      /// ...
 *  }
 * ```
 */
type Result<T1, T2> = Ok<T1> | Err<T2>;
declare const Result: ResultHandler;

/**
 * ***Brief***
 * A type that represents an optional value, encapsulating either a value `Some`
 * or the absence of a value `None`.
 */
type Option<T1> = Some<T1> | None;
declare const Option: OptionHandler;

type Unsafe = Wrapper<unknown> & Parsable;
declare function Unsafe(_value: unknown): Unsafe;

/**
 * ***Brief***
 * A wrapper for a value of type `T1` that provides a method to retrieve the wrapped value without handling.
 */
type Wrapper<T1> = {
    /**
     * ***Brief***
     * Safely unwraps the wrapped value of type `T1`.
     *
     * ***Requirement***
     * All exceptions to be handled.
     *
     * ***Example***
     * ```ts
     *  let unsafe: Unsafe = Unsafe(500n);
     *  unsafe.unwrap();
     * ```
     */
    unwrap(): T1;
};

/**
 * **Note**
 * `function` that narrows the type of the provided value to type `T1`.
 *
 * **Example**
 * ```ts
 *  let isNumber: TypeGuard<number>;
 *  let unknown: unknown;
 *  if (isNumber(unknown)) {
 *      /// ...
 *  }
 * ```
 */
type TypeGuard<T1> = (unknown: unknown) => unknown is T1;

/**
 * ***Brief***
 * A type-safety trait, enabling validation and transformation through user-defined type guard functions.
 *
 * ***Example***
 * ```ts
 *  let foo: Parsable;
 *  foo
 *      .parse((inst): inst is bigint => typeof inst === "bigint")
 *      .map(int => {
 *          /// ...
 *      });
 * ```
 */
type Parsable = {
    /**
     * ***Brief***
     * `parse` validates the value using a provided type guard function.
     *
     * ***Example***
     * ```ts
     *  let foo: Parsable;
     *  foo
     *      .parse((inst): inst is bigint => typeof inst === "bigint")
     *      .map(int => {
     *          /// ...
     *      });
     * ```
     */
    parse<T1>(guard: TypeGuard<T1>): Option<T1>;
};

/**
 * ***Brief***
 * Utility type for creating branded types with a unique string literal identifier `T1`.
 *
 * ***Example***
 * ```ts
 *  type Foo =
 *      & BrandedStruct<"Foo">
 *      & {
 *      foo: void;
 *  };
 *
 *  type Bar =
 *      & BrandedStruct<"Bar">
 *      & {
 *      foo: void;
 *  };
 *
 *  let union: Foo | Bar;
 *  if (union.type === "Foo") {
 *      /// ...
 *  }
 * ```
 */
type BrandedStruct<T1 extends string> = {
    /**
     * ***Brief***
     * Type-level marker specifying the unique type identifier `T1`.
     *
     * ***Example***
     * ```ts
     *  type Foo =
     *      & BrandedStruct<"Foo">
     *      & {
     *      foo: void;
     *  };
     *
     *  type Bar =
     *      & BrandedStruct<"Bar">
     *      & {
     *      foo: void;
     *  };
     *
     *  let union: Foo | Bar;
     *  if (union.type === "Foo") {
     *      /// ...
     *  }
     * ```
     */
    type: T1;
};

/**
 * ***Brief***
 * Utility type for creating branded types with a unique string literal identifier `T1`.
 *
 * ***Example***
 * ```ts
 *  type Foo =
 *      & Branded<"Foo">
 *      & {
 *      foo(): void;
 *  };
 *
 *  type Bar =
 *      & Branded<"Bar">
 *      & {
 *      foo(): void;
 *  };
 *
 *  let union: Foo | Bar;
 *  if (union.type() === "Foo") {
 *      /// ...
 *  }
 * ```
 */
type Branded<T1 extends string> = {
    /**
     * ***Brief***
     * Type-level marker method specifying the unique type identifier `T1`.
     *
     * ***Example***
     * ```ts
     *  type Foo =
     *      & Branded<"Foo">
     *      & {
     *      foo(): void;
     *  };
     *
     *  type Bar =
     *      & Branded<"Bar">
     *      & {
     *      foo(): void;
     *  };
     *
     *  let union: Foo | Bar;
     *  if (union.type() === "Foo") {
     *      /// ...
     *  }
     * ```
     */
    type(): T1;
};

/**
 * ***Brief***
 * Represents a generic function type that takes a single argument and returns a value.
 *
 * ***Example***
 * ```ts
 *  const addOne: Function<bigint, bigint> = (x: bigint) => x += 1n;
 * ```
 */
type Function$1<T1, T2> = (payload: T1) => T2;

/**
 * ***Brief***
 * Represents a callable function type that accepts an array of arguments and returns a specified type.
 *
 * ***Example***
 * ```ts
 *  const add: Closure<[bigint, bigint], bigint> = (x: bigint, y: bigint) => x + y;
 * ```
 */
type Closure<T1 extends Array<unknown>, T2> = (...payload: T1) => T2;

/**
 * ***Brief***
 * A type alias for a `Closure` that supports asynchronous operations.
 *
 * ***Example***
 * ```ts
 *  const fetch: AsyncClosure<[string], unknown> = async (url: string) => /// ...;
 * ```
 */
type AsyncClosure<T1 extends Array<unknown>, T2> = Closure<T1, Promise<T2>>;

/**
 * ***Brief***
 * Utility class for handling tasks with `Result`.
 */
type ResultHandler = {
    /**
     * ***Brief***
     * Iterates through an array of `Result`, short-circuiting at the first `Err`.
     *
     * ***Example***
     * ```ts
     * let r0: Result<200n, 404n>;
     * let r1: Result<201n, 405n>;
     * let r2: Result<202n, 406n>;
     * let r: Result<[200n, 201n, 202n], 404n | 405n | 406n> = Result.all([r0, r1, r2]);
     * ```
     */
    all<T1 extends Array<Result<unknown, unknown>>>(results: T1): Result<OkValOfAll<T1>, ErrValOfAll<T1>[number]>;
    /**
     * ***Brief***
     * Iterates through an array of `Result`, short-circuiting at the first `Ok`.
     *
     * ***Example***
     * ```ts
     *  let r0: Result<200n, 404n>;
     *  let r1: Result<201n, 405n>;
     *  let r2: Result<202n, 406n>;
     *  let r: Result<200n | 201n | 202n, [404n, 405n, 406n]> = Result.any([r0, r1, r2]);
     * ```
     */
    any<T1 extends Array<Result<unknown, unknown>>>(results: T1): Result<OkValOfAll<T1>[number], ErrValOfAll<T1>>;
    /**
     * ***Brief***
     * Wraps an unsafe operation that might throw an error and returns a `Result`.
     *
     * ***Example***
     * ```ts
     *  await Result.wrap(() => {
     *      /// Some unsafe task.
     *      /// ...
     *      return 200n;
     *  }).mapErr(unsafe => {
     *      unsafe
     *          .parse((unknown): unknown is string => {
     *              return typeof unknown is "string";
     *          })
     *          .map(string => {
     *              /// ...
     *          });
     *      return 200n;
     *  });
     * ```
     */
    wrap<T1, T2, T3 extends Array<T2>>(task: Closure<T3, T1>, ...payload: T3): Result<T1, Unsafe>;
    /**
     * ***Brief***
     * Wraps an asynchronous unsafe operation that may throw and returns a `Result`.
     *
     *
     * ***Example***
     * ```ts
     *  await Result.wrapAsync(async () => {
     *      /// Some unsafe async task.
     *      /// ...
     *      return 200n;
     *  }).mapErr(unsafe => {
     *      unsafe
     *          .parse((unknown): unknown is string => {
     *              return typeof unknown is "string";
     *          })
     *          .map(string => {
     *              /// ...
     *          });
     *      return 200n;
     *  });
     * ```
     */
    wrapAsync<T1, T2, T3 extends Array<T2>>(task: AsyncClosure<T3, T1>, ...payload: T3): Promise<Result<T1, Unsafe>>;
};

type OkValOfAll<T1 extends Array<Result<unknown, unknown>>> = {
    [T2 in keyof T1]: OkValOf<T1[T2]>;
};

type OkValOf<T1 extends Result<unknown, unknown>> = T1 extends Ok<infer T2> ? T2 : never;

type Ok<T1> = Wrapper<T1> & {
    /**
     * ***Brief***
     * `ok` checks if the current instance is `Ok`.
     *
     * ***Example***
     * ```ts
     *  let result: Result<200n, 404n>;
     *  if (result.ok()) {
     *      let value: 200n = result.unlock();
     *      /// ...
     *  }
     * ```
     */
    ok(): this is Ok<T1>;
    /**
     * ***Brief***
     * `err` checks if the current instance is `Err`.
     *
     * ***Example***
     * ```ts
     *  let result: Result<200n, 404n>;
     *  if (result.err()) {
     *      let e: 404n = result.inspect();
     *      /// ...
     *  }
     * ```
     */
    err(): this is Err<unknown>;
    /**
     * ***Brief***
     * `expect` terminates with `panic` if the `Result` is `Err`.
     *
     * ***Warning***
     * Reserved for debugging or unrecoverable errors.
     *
     * ***Example***
     * ```ts
     *  let result: Result<200n, 404n>;
     *  let status: 200n = result.expect("This is unexpected and unrecoverable.");
     * ```
     */
    expect(__: unknown): T1;
    /**
     * ***Brief***
     * Ensures that the `Result` is an `Err` and retrieves the error value inside.
     *
     * ***Warning***
     * Reserved for debugging or unrecoverable errors.
     *
     * ***Example***
     * ```ts
     *  let result: Result<200n, 404n>;
     *  let status: 404n = result.expectErr("This is unexpected and unrecoverable.");
     * ```
    */
    expectErr(message: string): never;
    /**
     * ***Brief***
     * Retrieves the value of an `Ok`, or falls back to the provided value if it’s an `Err`.
     *
     * ***Example***
     * ```ts
     *  let result: Result<200n, 404n> = Err(404n);
     *  let status: 200n = result.unwrapOr(200n);
     *  console.log(status); /// 200n.
     * ```
     */
    unwrapOr(__: unknown): T1;
    /**
     * ***Brief***
     * Recovers from the current error by applying a recovery function, transforming the `Err` into an `Ok`.
     *
     * ***Example***
     * ```ts
     *  let result: Result<200n, 404n> = Err(404n);
     *  let status: 200n = result
     *      .recover(() => {
     *          return 200n;
     *      })
     *      .unlock();
     * ```
     */
    recover(__: unknown): Ok<T1>;
    /**
     * ***Brief***
     * Applies a transformation to the `Ok` value and returns an `Err` instance with the transformed value.
     *
     * ***Example***
     * ```ts
     *  let result: Result<200n, 404n> = Ok(200n);
     *  let e: 404n = result
     *      .degrade(() => {
     *          return 404n;
     *      })
     *      .inspect();
     *  console.log(e); /// 404n.
     * ```
     */
    degrade<T2>(task: Function$1<T1, T2>): Err<T2>;
    /**
     * ***Brief***
     * Chains an task until the first `Err` is encountered.
     *
     * ***Example***
     * ```ts
     *  let result: Result<200n, 404n> = Err(404n);
     *  result
     *      .and(value => {
     *          /// Task is skipped because `Result` is an `Err`.
     *          /// ...
     *          return Ok(value + 1n);
     *      })
     *      .and(value => {
     *          /// Task is skipped because `Result` is an `Err`.
     *          /// ...
     *      });
     * ```
     */
    and<T2>(task: Function$1<T1, Ok<T2>>): Ok<T2>;
    and<T2>(task: Function$1<T1, Err<T2>>): Result<T1, T2>;
    and<T2, T3>(task: Function$1<T1, Result<T2, T3>>): Result<T2, T3>;
    /**
     * ***Brief***
     * Transforms the `Ok` value if present, but if this is already an `Err`, it remains unchanged.
     *
     * ***Example***
     * ```ts
     *  let result0: Result<200n, 404n> = Ok(200n);
     *  let result1: Result<201n, 404n> = result.map(value => {
     *      /// Task is run because `Result` is `Ok`.
     *      /// ...
     *      return value + 1n;
     *  });
     * ```
     */
    map<T2>(task: Function$1<T1, T2>): Ok<T2>;
    /**
     * ***Brief***
     * Transforms the error contained in the `Err` using the provided `task` function.
     *
     * ***Example***
     * ```ts
     *  let result: Result<200n, 404n> = Err(404n);
     *  result
     *      .mapErr(e => {
     *          return e + 1n;
     *      })
     *      .inspect(); /// 405n.
     * ```
     *
     * ***Example***
     * ```ts
     *  let result: Result<200n, 404n> = Ok(200n);
     *  result
     *      .mapErr(e => {
     *          /// Task is run because `Result` is `Ok`.
     *          /// ...
     *      });
     * ```
     */
    mapErr(__: unknown): Ok<T1>;
    /**
     * ***Brief***
     * Converts a `Result<T1, T2>` to an `Option<T1>`.
     *
     * ***Example***
     * ```ts
     *  let result: Result<200n, 404n>;
     *  let option: Option<200n> = result.toOption();
     * ```
     */
    toOption(): Option<T1>;
};
/**
 * ***Brief***
 * The successful value within a `Result`.
 */
declare function Ok<T1>(_value: T1): Ok<T1>;

type ErrValOfAll<T1 extends Array<Result<unknown, unknown>>> = {
    [T2 in keyof T1]: ErrValOf<T1[T2]>;
};

type ErrValOf<T1 extends Result<unknown, unknown>> = T1 extends Err<infer T2> ? T2 : never;

type Err<T1> = {
    /**
     * ***Brief***
     * `ok` checks if the current instance is `Ok`.
     *
     * ***Example***
     * ```ts
     *  let result: Result<200n, 404n>;
     *  if (result.ok()) {
     *      let value: 200n = result.unlock();
     *      /// ...
     *  }
     * ```
     */
    ok(): this is Ok<unknown>;
    /**
     * ***Brief***
     * `err` checks if the current instance is `Err`.
     *
     * ***Example***
     * ```ts
     *  let result: Result<200n, 404n>;
     *  if (result.err()) {
     *      let e: 404n = result.inspect();
     *      /// ...
     *  }
     * ```
     */
    err(): this is Err<T1>;
    /**
     * ***Brief***
     * Retrieves the error value encapsulated by the `Err` instance.
     *
     * ***Example***
     * ```ts
     *  let result: Result<200n, 404n>;
     *  if (result.err()) {
     *      let e: 404n = result.inspect();
     *      /// ...
     *  }
     * ```
     */
    inspect(): T1;
    /**
     * ***Brief***
     * Retrieves the stack trace of the error, generated at the time the `Err` instance was created.
     *
     * ***Example***
     * ```ts
     *  let result: Result<200n, 404n>;
     *  if (result.err()) {
     *      result
     *          .stack()
     *          .lines()
     *          .forEach(line => {
     *              let lineRepresentation: string = line.toString();
     *              /// ...
     *              return;
     *          });
     *  }
     * ```
     */
    stack(): string;
    /**
     * ***Brief***
     * `expect` terminates with `panic` if the `Result` is `Err`.
     *
     * ***Warning***
     * Reserved for debugging or unrecoverable errors.
     *
     * ***Example***
     * ```ts
     *  let result: Result<200n, 404n>;
     *  let status: 200n = result.expect("This is unexpected and unrecoverable.");
     * ```
     */
    expect(message: string): never;
    /**
     * ***Brief***
     * Ensures that the `Result` is an `Err` and retrieves the error value inside.
     *
     * ***Warning***
     * Reserved for debugging or unrecoverable errors.
     *
     * ***Example***
     * ```ts
     *  let result: Result<200n, 404n>;
     *  let status: 404n = result.expectErr("This is unexpected and unrecoverable.");
     * ```
    */
    expectErr(__: unknown): T1;
    /**
     * ***Brief***
     * Retrieves the value of an `Ok`, or falls back to the provided value if it’s an `Err`.
     *
     * ***Example***
     * ```ts
     *  let result: Result<200n, 404n> = Err(404n);
     *  let status: 200n = result.unwrapOr(200n);
     *  console.log(status); /// 200n.
     * ```
     */
    unwrapOr<T2>(fallback: T2): T2;
    /**
     * ***Brief***
     * Chains an task until the first `Err` is encountered.
     *
     * ***Example***
     * ```ts
     *  let result: Result<200n, 404n> = Err(404n);
     *  result
     *      .and(value => {
     *          /// Task is skipped because `Result` is an `Err`.
     *          /// ...
     *          return Ok(value + 1n);
     *      })
     *      .and(value => {
     *          /// Task is skipped because `Result` is an `Err`.
     *          /// ...
     *      });
     * ```
     */
    and(__: unknown): Err<T1>;
    /**
     * ***Brief***
     * Transforms the `Ok` value if present, but if this is already an `Err`, it remains unchanged.
     *
     * ***Example***
     * ```ts
     *  let result0: Result<200n, 404n> = Ok(200n);
     *  let result1: Result<201n, 404n> = result.map(value => {
     *      /// Task is run because `Result` is `Ok`.
     *      /// ...
     *      return value + 1n;
     *  });
     * ```
     */
    map(__: unknown): Err<T1>;
    /**
     * ***Brief***
     * Transforms the error contained in the `Err` using the provided `task` function.
     *
     * ***Example***
     * ```ts
     *  let result: Result<200n, 404n> = Err(404n);
     *  result
     *      .mapErr(e => {
     *          return e + 1n;
     *      })
     *      .inspect(); /// 405n.
     * ```
     *
     * ***Example***
     * ```ts
     *  let result: Result<200n, 404n> = Ok(200n);
     *  result
     *      .mapErr(e => {
     *          /// Task is run because `Result` is `Ok`.
     *          /// ...
     *      });
     * ```
     */
    mapErr<T2>(task: Function$1<T1, T2>): Err<T2>;
    /**
     * ***Brief***
     * Recovers from the current error by applying a recovery function, transforming the `Err` into an `Ok`.
     *
     * ***Example***
     * ```ts
     *  let result: Result<200n, 404n> = Err(404n);
     *  let status: 200n = result
     *      .recover(() => {
     *          return 200n;
     *      })
     *      .unlock();
     * ```
     */
    recover<T2>(task: Function$1<T1, T2>): Ok<T2>;
    /**
     * ***Brief***
     * Applies a transformation to the `Ok` value and returns an `Err` instance with the transformed value.
     *
     * ***Example***
     * ```ts
     *  let result: Result<200n, 404n> = Ok(200n);
     *  let e: 404n = result
     *      .degrade(() => {
     *          return 404n;
     *      })
     *      .inspect();
     *  console.log(e); /// 404n.
     * ```
     */
    degrade(__: unknown): Err<T1>;
    /**
     * ***Brief***
     * Converts a `Result<T1, T2>` to an `Option<T1>`.
     *
     * ***Example***
     * ```ts
     *  let result: Result<200n, 404n>;
     *  let option: Option<200n> = result.toOption();
     * ```
     */
    toOption(): Option<never>;
};
/**
 * ***Brief***
 * The failed state of a `Result`.
 *
 * ***Warning***
 * Any operation attempting to access a `Result` must safely handle the `Err` state or terminate with an error.
 */
declare function Err<T1>(_value: T1): Err<T1>;
declare function Err<T1>(_value: T1, _handler: ErrorHandler): Err<T1>;

type SomeValOfAll<T1 extends Array<Option<unknown>>> = {
    [T2 in keyof T1]: SomeValOf<T1[T2]>;
};

type SomeValOf<T1 extends Option<unknown>> = T1 extends Some<infer T2> ? T2 : never;

type Some<T1> = Branded<"Some"> & Wrapper<T1> & {
    /**
     * ***Brief***
     * `some` checks if the current instance is `Some`.
     *
     * ***Example***
     * ```ts
     *  let option: Option<200n>;
     *  if (option.some()) {
     *      let value: 200n = option.unlock();
     *      /// ...
     *  }
     * ```
     */
    some(): this is Some<T1>;
    /**
     * ***Brief***
     * `none` checks if the current instance is `None`.
     *
     * ***Example***
     * ```ts
     *  let option: Option<200n>;
     *  if (option.none()) {
     *      /// `Option` cannot `unlock` because it is `None`.
     *      /// ...
     *  }
     * ```
     */
    none(): this is None;
    /**
     * ***Brief***
     * `expect` terminates with `panic` if the `Option` is `None`.
     *
     * ***Warning***
     * Reserved for debugging or unrecoverable errors.
     *
     * ***Example***
     * ```ts
     *  let option: Option<200n>;
     *  let status: 200n = option.expect("This is unexpected and unrecoverable.");
     * ```
     */
    expect(__: unknown): T1;
    /**
     * ***Brief***
     * Retrieves the value of a `Some`, or falls back to the provided value if it’s `None`.
     *
     * ***Example***
     * ```ts
     *  let option: Option<200n> = None;
     *  let status: 200n = option.unwrapOr(200n);
     *  console.log(status); /// 200n.
     * ```
     */
    unwrapOr(__: unknown): T1;
    /**
     * ***Brief***
     * Chains an task until the first `None` is encountered.
     *
     * ***Example***
     * ```ts
     *  let option: Option<200n> = None;
     *  option
     *      .and(value => {
     *          /// Task is skipped because `Option` is `None`.
     *          /// ...
     *          return Some(value + 1n);
     *      })
     *      .and(value => {
     *          /// Task is skipped because `Option` is `None`.
     *          /// ...
     *      });
     * ```
     */
    and<T2>(task: Function$1<T1, Option<T2>>): Option<T2>;
    /**
     * ***Brief***
     * Transforms the `Some` value if present, but if this is already an `None`, it remains unchanged.
     *
     * ***Example***
     * ```ts
     *  let option0: Option<200n> = Some(200n);
     *  let option1: Option<201n> = option.map(value => {
     *      /// Task is run because `Option` is `Some`.
     *      /// ...
     *      return value + 1n;
     *  });
     * ```
     */
    map<T2>(task: Function$1<T1, T2>): Some<T2>;
    /**
     * ***Brief***
     * Converts an `Option<T1>` to a `Result<T1, T2>`.
     *
     * ***Example***
     * ```ts
     *  let option: Option<200n>;
     *  let result: Result<200n, 404n> = option.toResult(404n);
     * ```
     */
    toResult(__: unknown): Ok<T1>;
};
/**
 * ***Brief***
 * The value within an `Option`.
 */
declare function Some<T1>(_value: T1): Some<T1>;

/**
 * ***Brief***
 * Utility class for handling tasks within `Option`.
 */
type OptionHandler = {
    /**
     * ***Brief***
     * Wraps a value into an `Option`, turning `null` or `undefined` to `None`.
     *
     * ***Example***
     * ```ts
     *  let foo: string | undefined;
     *  Option
     *      .flag(foo)
     *      .map(foo => {
     *          /// ...
     *      });
     * ```
     */
    flag<T1>(value: T1 | null | undefined): Option<T1>;
    /**
     * ***Brief***
     * Iterates through an array of `Option`, short-circuiting at the first `None`.
     *
     * ***Example***
     * ```ts
     *  let o0: Option<200n>;
     *  let o1: Option<201n>;
     *  let o2: Option<202n>;
     *  let o: Option<[200n, 201n, 202n]> = Option.all([o0, o1, o2]);
     * ```
     */
    all<T1 extends Array<Option<unknown>>>(...options: T1): Option<SomeValOfAll<T1>>;
    /**
     * ***Brief***
     * Iterates through an array of `Option`, short-circuiting at the first `Some`.
     *
     * ***Example***
     * ```ts
     *  let o0: Option<200n>;
     *  let o1: Option<201n>;
     *  let o2: Option<202n>;
     *  let o: Option<200n | 201n | 202n> = Option.any([o0, o1, o2]);
     * ```
     */
    any<T1 extends Array<Option<unknown>>>(...options: T1): Option<SomeValOfAll<T1>[number]>;
};

type None = Branded<"None"> & {
    /**
     * ***Brief***
     * `some` checks if the current instance is `Some`.
     *
     * ***Example***
     * ```ts
     *  let option: Option<200n>;
     *  if (option.some()) {
     *      let value: 200n = option.unlock();
     *      /// ...
     *  }
     * ```
     */
    some(): this is Some<unknown>;
    /**
     * ***Brief***
     * `none` checks if the current instance is `None`.
     *
     * ***Example***
     * ```ts
     *  let option: Option<200n>;
     *  if (option.none()) {
     *      /// `Option` cannot `unlock` because it is `None`.
     *      /// ...
     *  }
     * ```
     */
    none(): this is None;
    /**
     * ***Brief***
     * `expect` terminates with `panic` if the `Option` is `None`.
     *
     * ***Warning***
     * Reserved for debugging or unrecoverable errors.
     *
     * ***Example***
     * ```ts
     *  let option: Option<200n>;
     *  let status: 200n = option.expect("This is unexpected and unrecoverable.");
     * ```
     */
    expect(message: string): never;
    /**
     * ***Brief***
     * Retrieves the value of a `Some`, or falls back to the provided value if it’s `None`.
     *
     * ***Example***
     * ```ts
     *  let option: Option<200n> = None;
     *  let status: 200n = option.unwrapOr(200n);
     *  console.log(status); /// 200n.
     * ```
     */
    unwrapOr<T2>(fallback: T2): T2;
    /**
     * ***Brief***
     * Chains an task until the first `None` is encountered.
     *
     * ***Example***
     * ```ts
     *  let option: Option<200n> = None;
     *  option
     *      .and(value => {
     *          /// Task is skipped because `Option` is `None`.
     *          /// ...
     *          return Some(value + 1n);
     *      })
     *      .and(value => {
     *          /// Task is skipped because `Option` is `None`.
     *          /// ...
     *      });
     * ```
     */
    and(__: unknown): None;
    /**
     * ***Brief***
     * Transforms the `Some` value if present, but if this is already an `None`, it remains unchanged.
     *
     * ***Example***
     * ```ts
     *  let option0: Option<200n> = Some(200n);
     *  let option1: Option<201n> = option.map(value => {
     *      /// Task is run because `Option` is `Some`.
     *      /// ...
     *      return value + 1n;
     *  });
     * ```
     */
    map(__: unknown): None;
    /**
     * ***Brief***
     * Converts an `Option<T1>` to a `Result<T1, T2>`.
     *
     * ***Example***
     * ```ts
     *  let option: Option<200n>;
     *  let result: Result<200n, 404n> = option.toResult(404n);
     * ```
     */
    toResult<T1>(e: T1): Err<T1>;
};
/**
 * ***Brief***
 * The absence of a value or an "empty" state.
 *
 * ***Warning***
 * Any operation attempting to access an `Option` must safely handle the `None` state or terminate with an error.
 */
declare const None: None;

type ErrorHandler = {
    matchError(unknown: unknown): unknown is Error$1<any, unknown>;
    matchError(unknown: unknown, task: Closure<[e: Error$1<any, unknown>], void>): unknown is Error$1<any, unknown>;
    matchError<T1 extends string>(unknown: unknown, code: T1): unknown is Error$1<T1, unknown>;
    matchError<T1 extends string>(unknown: unknown, code: T1, task: Closure<[e: Error$1<any, unknown>], void>): unknown is Error$1<T1, unknown>;
    localStackTrace(location: Function): Option<string>;
    parseStackTrace(locationOrStack: Function | string): string;
    convertToStandardError<T1 extends string, T2 = unknown>(e: Error$1<T1, T2>): Error;
};
declare const ErrorHandler: ErrorHandler;

type Error$1<T1 extends string, T2 = unknown> = BrandedStruct<"Error"> & {
    /**
     * ***Brief***
     * The unique identifier for this error.
     */
    code: T1;
    /**
     * ***Brief***
     * A human-readable message that explains the nature of the error.
     */
    message: Option<string>;
    /**
     * ***Brief***
     * An optional value that can hold additional data or context related to the error.
     */
    payload: Option<T2>;
    /**
     * ***Brief***
     * The stack trace associated with the error.
     */
    stack: string;
};
/**
 * ***Brief***
 * A custom error with an optional message and payload for strongly-typed errors.
 *
 * ***Note***
 * This is a general-purpose error structure to manage domain-specific error codes and provide better context.
 */
declare function Error$1<T1 extends string, T2 = unknown>(_configuration: {
    code: T1;
    message?: string;
    payload?: T2;
    stack?: string;
    handler?: ErrorHandler;
}): Error$1<T1, T2>;
declare function Error$1<T1 extends string, T2 = unknown>(_code: T1, _message?: string, _payload?: T2): Error$1<T1, T2>;

export { type AsyncClosure as A, type BrandedStruct as B, type Closure as C, type ErrValOfAll as E, type Function$1 as F, None as N, Ok as O, type Parsable as P, Result as R, Some as S, type TypeGuard as T, Unsafe as U, type Wrapper as W, type Branded as a, type OkValOfAll as b, Err as c, Option as d, type OptionHandler as e, type SomeValOfAll as f, type SomeValOf as g, type ResultHandler as h, type ErrValOf as i, type OkValOf as j };

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

/**
 * ***Brief***
 * A wrapper for a value of type `T1` that provides a method to retrieve the wrapped value without handling.
 */
type Wrapper<T1> = {
    /**
     * ***Brief***
     * Unwraps the wrapped value of type `T1`.
     *
     * ***Requirement***
     * Must require no handling to access.
     *
     * ***Example***
     * ```ts
     *  let unsafe: Unsafe = Unsafe(500n);
     *  unsafe.unwrap();
     * ```
     */
    unwrap(): T1;
};

type Unsafe = Wrapper<unknown> & Parsable;
declare function Unsafe(_value: unknown): Unsafe;

/**
 * ***Brief***
 * Represents an unlocked wrapper which can be unlocked to retrieve its value.
 */
type UnlockedWrapper<T1> = Omit<Wrapper<T1>, "unwrap"> & {
    /**
     * ***Brief***
     * Unlocks the value to retrieve the original stored data of type `T1`.
     *
     * ***Requirement***
     * The error state must be handled.
     *
     * ***Example***
     * ```ts
     *  let result: Result<200n, 404n>;
     *  if (result.ok()) {
     *      let status: 200n = result.unlock();
     *      /// ...
     *  }
     * ```
     */
    unlock(): T1;
};

declare const allR: <T1 extends Array<Result<unknown, unknown>>>(results: T1) => Result<OkValOfAll<T1>, ErrValOfAll<T1>[number]>;
declare const anyR: <T1 extends Array<Result<unknown, unknown>>>(results: T1) => Result<OkValOfAll<T1>[number], ErrValOfAll<T1>>;
declare const wrap: <T1, T2, T3 extends Array<T2>>(task: Closure<T3, T1>, ...payload: T3) => Result<T1, Unsafe>;
declare const wrapAsync: <T1, T2, T3 extends Array<T2>>(task: AsyncClosure<T3, T1>, ...payload: T3) => Promise<Result<T1, Unsafe>>;

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

type OkOfAll<T1 extends Array<Result<unknown, unknown>>> = {
    [T2 in keyof T1]: T1[T2] extends Ok<unknown> ? OkOf<T1[T2]> : never;
};

type OkOf<T1 extends Result<unknown, unknown>> = T1 extends Ok<infer T2> ? Ok<T2> : never;

type Ok<T1> = UnlockedWrapper<T1> & {
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
     *  let status: 200n = result.unlockOr(200n);
     *  console.log(status); /// 200n.
     * ```
     */
    unlockOr(__: unknown): T1;
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

type ErrOfAll<T1 extends Array<Result<unknown, unknown>>> = {
    [T2 in keyof T1]: T1[T2] extends Err<unknown> ? ErrOf<T1[T2]> : never;
};

type ErrOf<T1 extends Result<unknown, unknown>> = T1 extends Err<infer T2> ? Err<T2> : never;

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
     *  let status: 200n = result.unlockOr(200n);
     *  console.log(status); /// 200n.
     * ```
     */
    unlockOr<T2>(fallback: T2): T2;
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

type RefTask<T1> = Closure<[new: T1, old: T1], void>;

type RefDelTask = Closure<[], void>;

type Ref<T1> = Wrapper<T1> & {
    /**
     * ***Brief***
     * Mutates the internal value of the `Ref` instance.
     */
    mut(value: T1): Ref<T1>;
    /**
     * ***Brief***
     * Registers a callback that is invoked whenever the value changes.
     *
     * ***Example***
     * ```ts
     *  let ref: Ref<bigint> = Ref(200n);
     *  ref.onChange(value => {
     *      /// ...
     *      return;
     *  });
     *  ref.mut(404n);
     * ```
     */
    onChange(task: RefTask<T1>): RefDelTask;
};
/**
 * ***Brief***
 * Wrapper that supports mutation and change tracking.
 */
declare function Ref<T1>(_value: T1): Ref<T1>;

/**
 * ***Brief***
 * A dynamic wrapper for resource allocation and deallocation.
 */
type DynWrapper<T1> = {
    /**
     * ***Brief***
     * Deallocates a resource, making it available for recycling.
     *
     * ***Example***
     * ```ts
     *  let personD: Dyn<{ name: string }>;
     *  personD
     *      .deAlloc()
     *      .map(person => {
     *          /// Not run because `person` was deallocated.
     *          /// ...
     *      });
     * ```
     */
    deAlloc(): DeAlloc<T1>;
};

type DynConstructor<T1, T2 extends Array<unknown>> = Closure<T2, Dyn<T1>>;

type Dyn<T1> = Alloc<T1> | DeAlloc<T1>;
/**
 * ***Brief***
 * A dynamic resource management pattern, allowing for
 * allocation and deallocation of resources with proper lifecycle handling.
 *
 * ***Warning***
 * The `Dyn` wrapper must be properly managed to avoid memory leaks. If the wrapper itself is garbage collected
 * without its content being explicitly deallocated, the resources it manages will not be recycled
 * and made available for reuse. Ensure all allocated resources are deallocated before the `Dyn` instance goes out of scope.
 *
 * ***Example***
 * ```ts
 *  type Car = {
 *      drive(): void;
 *  };
 *
 *  const Car: DynConstructor<Car, [_model: string]> = Dyn(
 *      (_model: string) => {
 *          constructor {
 *              return { drive };
 *          }
 *
 *          function drive(): void {
 *              return "Vroom.";
 *          }
 *      },
 *      car => {
 *          /// Reset car or any tasks before it is made available again.
 *          /// ...
 *          return car;
 *      }, 32n, "ModelT"
 *  );
 *
 *  let car: Dyn<Car> = Car("ModelF");
 *  car = car.deAlloc();
 *  car.map(car => {
 *      /// Will not run because `car` has been deallocated.
 *      /// ...
 *  });
 * ```
 *
 * ***Example***
 * ```ts
 *  /// Warning.
 *  let car: Dyn<Car> = Car("ModelB");
 *  car.deAlloc();
 *  car.map(car => {
 *      /// Will run because the car must be updated to the new state.
 *      /// Always assign the `deAlloc` result a new `Dyn` wrapper or
 *      /// itself.
 *      /// ...
 *  });
 * ```
 */
declare function Dyn<T1, T2 extends Array<unknown>>(_constructor: Closure<T2, T1>, _onDeAlloc: Closure<[T1], T1>, _load: bigint, ..._onLoadPayload: T2): Closure<T2, Dyn<T1>>;

type DeAlloc<T1> = DynWrapper<T1> & None;
/**
 * ***Brief***
 * The deallocated state of an allocated resource.
 */
declare function DeAlloc<T1>(_dyn: DynWrapper<T1>): DeAlloc<T1>;

type Alloc<T1> = DynWrapper<T1> & UnlockedWrapper<T1> & Some<T1>;
/**
 * ***Brief***
 * The allocated state of an allocated resource.
 */
declare function Alloc<T1>(_value: T1, _dyn: DynWrapper<T1>): Alloc<T1>;

declare const flag: typeof Option.flag;
declare const allO: typeof Option.all;
declare const anyO: typeof Option.any;

type SomeValOfAll<T1 extends Array<Option<unknown>>> = {
    [T2 in keyof T1]: SomeValOf<T1[T2]>;
};

type SomeValOf<T1 extends Option<unknown>> = T1 extends Some<infer T2> ? T2 : never;

type SomeOfAll<T1 extends Array<Option<unknown>>> = {
    [T2 in keyof T1]: T1[T2] extends Some<unknown> ? SomeOf<T1[T2]> : never;
};

type SomeOf<T1 extends Option<unknown>> = T1 extends Some<infer T2> ? Some<T2> : never;

type Some<T1> = Branded<"Some"> & UnlockedWrapper<T1> & {
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
     *  let status: 200n = option.unlockOr(200n);
     *  console.log(status); /// 200n.
     * ```
     */
    unlockOr(__: unknown): T1;
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
     *  let status: 200n = option.unlockOr(200n);
     *  console.log(status); /// 200n.
     * ```
     */
    unlockOr<T2>(fallback: T2): T2;
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

type FpvIsh<T1 extends bigint = 2n> = Fpv<T1> | bigint;

type FpvErrorCode = "FPV.ERR_DIVISION_BY_ZERO" | "FPV.ERR_PRECISION_IS_ZERO" | "FPV.ERR_PRECISION_IS_NEGATIVE";

type FpvError = Error$1<FpvErrorCode>;

type Fpv<T1 extends bigint = 2n> = Wrapper<bigint> & {
    /**
     * ***Brief***
     * Returns the precision of the `Fpv`.
     */
    precision(): T1;
    /**
     * ***Brief***
     * Returns the representation factor of the `Fpv`, based on its precision.
     */
    representation(): bigint;
    /**
     * ***Brief***
     * Adds a given `FpvIsh` value to the current `Fpv`.
     *
     * ***Warning***
     * Extremely large values may cause the program to panic due to insufficient memory.
     *
     * ***Example***
     * ```ts
     *  let value: bigint = Fpv(200n)
     *      .expect("Failed to initialize Fpv.")
     *      .add(100n)
     *      .unwrap();
     *  console.log(value); /// 300n === 3.00
     * ```
     */
    add(value: FpvIsh<T1>): Fpv<T1>;
    /**
     * ***Brief***
     * Subtracts a given `FpvIsh` value from the current `Fpv`.
     *
     * ***Warning***
     * Extremely large values may cause the program to panic due to insufficient memory.
     *
     * ***Example***
     * ```ts
     *  let value: bigint = Fpv(200n)
     *      .expect("Failed to initialize Fpv.")
     *      .sub(100n)
     *      .unwrap();
     *  console.log(value); /// 100n === 1.00
     * ```
     */
    sub(value: FpvIsh<T1>): Fpv<T1>;
    /**
     * ***Brief***
     * Multiplies the current `Fpv` by a given `FpvIsh` value.
     *
     * ***Warning***
     * Extremely large values may cause the program to panic due to insufficient memory.
     *
     * ***Example***
     * ```ts
     *  let value: bigint = Fpv(200n)
     *      .expect("Failed to initialize Fpv.")
     *      .mul(50n) /// 0.50
     *      .unwrap();
     *  console.log(value); /// 100n === 1.00
     * ```
     */
    mul(value: FpvIsh<T1>): Fpv<T1>;
    /**
     * ***Brief***
     * Divides the current `Fpv` by a given `FpvIsh` value.
     *
     * ***Warning***
     * Extremely large values may cause the program to panic due to insufficient memory.
     *
     * ***Warning***
     * If dividing by zero, an error will be returned.
     *
     * ***Example***
     * ```ts
     *  let value: bigint = Fpv(200n)
     *      .expect("Failed to initialize Fpv.")
     *      .div(50n) /// 0.50
     *      .unwrap();
     *  console.log(value); /// 400n === 4.00
     * ```
     */
    div(value: FpvIsh<T1>): Result<Fpv<T1>, FpvError>;
};
/**
 * ***Brief***
 * Creates a new `Fpv` with the provided value and precision.
 */
declare function Fpv<T1 extends bigint = 2n>(_fpv: FpvIsh<T1>, _precision?: T1): Result<Fpv<T1>, FpvError>;

/**
 * ***Brief***
 * Converts `unknown` to `string`.
 *
 * ***Warning***
 * Does not support circular references and circular objects will result in `[object Object]`.
 *
 * ***Example***
 *  ```ts
 *  console.log(toString(42));          /// 42
 *  console.log(toString(true));        /// true
 *  console.log(toString(null));        /// null
 *  console.log(toString(undefined));   /// undefined
 *
 *  console.log(toString("example"));   /// example
 *
 *  let object: {
 *      color: string;
 *      speed: {
 *          min: number,
 *          max: number
 *      }
 *  } = {
 *      color: "Blue",
 *      speed: {
 *          min: 0,
 *          max: 500
 *      }
 *  };
 *  console.log(object);                /// {"color":"Blue","speed":{"min":0,"max":500}}
 *
 *  function foo(): void {
 *      let x: string = 500;
 *      return x;
 *  }
 *  console.log(foo);                   /// function foo() {
 *                                      ///     x = 500;
 *                                      ///     return x;
 *                                      /// }
 *  ```
 */
declare function toString(unknown: unknown): string;

/**
 * ***Brief***
 * Creates a deep clone of the provided value using the structuredClone API.
 *
 * ***Example***
 * ```ts
 *  clone()
 *      .resolve(e => {
 *          if (e.code === "DOM.ERR_DATA_CLONE") {
 *              /// ...
 *          }
 *      })
 *      .unlock();
 * ```
 */
declare function clone<T1>(value: T1): Result<T1, DomError>;

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
 * A value that can either be resolved immediately or asynchronously.
 */
type MaybeAsync<T1> = Promise<T1> | T1;

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
 * A type alias for a `Function` that supports asynchronous operation.
 *
 * ***Example***
 * ```ts
 *  const fetch: AsyncFunction<string, unknown> = async (url: string) => /// ...;
 * ```
 */
type AsyncFunction<T1, T2> = Function$1<T1, Promise<T2>>;

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
 * `panic` throws an error with optional message and stack trace location.
 *
 * ***Example***
 * ```ts
 *  panic(Error("MATH.ERR_DIVISION_BY_ZERO"));
 *  panic(Error({
 *      code: "MATH.ERR_DIVISION_BY_ZERO",
 *      message: Some("Math: Cannot divide by zero."),
 *      payload: None,
 *      stack: StackTrace(...)
 *  }));
 *  panic("An unrecoverable error has occured.");
 * ```
 */
declare function panic<T1 extends string>(e: Error$1<T1>, handler?: ErrorHandler): never;
declare function panic<T1 extends string>(message: T1, location?: Function, handler?: ErrorHandler): never;

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

type DomErrorCode = "DOM.ERR_INDEX_SIZE" | "DOM.ERR_HIERARCHY_REQUEST" | "DOM.ERR_WRONG_DOCUMENT" | "DOM.ERR_INVALID_CHARACTER" | "DOM.ERR_NO_MODIFICATION_ALLOWED" | "DOM.ERR_NOT_FOUND" | "DOM.ERR_NOT_SUPPORTED" | "DOM.ERR_INVALID_STATE" | "DOM.ERR_ATTRIBUTE_IN_USE" | "DOM.ERR_SYNTAX" | "DOM.ERR_INVALID_MODIFICATION" | "DOM.ERR_NAMESPACE" | "DOM.ERR_INVALID_ACCESS" | "DOM.ERR_TYPE_MISMATCH" | "DOM.ERR_SECURITY" | "DOM.ERR_NETWORK" | "DOM.ERR_ABORT" | "DOM.ERR_URL_MISMATCH" | "DOM.ERR_QUOTA_EXCEEDED" | "DOM.ERR_TIMEOUT" | "DOM.ERR_INVALID_NODE_TYPE" | "DOM.ERR_DATA_CLONE" | "DOM.ERR_ENCODING" | "DOM.ERR_NOT_READABLE" | "DOM.ERR_UNKNOWN" | "DOM.ERR_CONSTRAINT" | "DOM.ERR_DATA" | "DOM.ERR_TRANSACTION_INACTIVE" | "DOM.ERR_READ_ONLY" | "DOM.ERR_VERSION" | "DOM.ERR_OPERATION" | "DOM.ERR_NOT_ALLOWED";

type DomError = Error$1<DomErrorCode>;
/**
 * ***Brief***
 * A domain-specific error that provides the error code for DOM exceptions.
 */
declare function DomError(): DomError;
declare function DomError(_e: DOMException): DomError;

export { Alloc, type AsyncClosure, type AsyncFunction, type Branded, type BrandedStruct, type Closure, DeAlloc, DomError, type DomErrorCode, Dyn, type DynConstructor, type DynWrapper, Err, type ErrOf, type ErrOfAll, type ErrValOf, type ErrValOfAll, Error$1 as Error, Fpv, type FpvError, type FpvErrorCode, type FpvIsh, type Function$1 as Function, type MaybeAsync, None, Ok, type OkOf, type OkOfAll, type OkValOf, type OkValOfAll, Option, type OptionHandler, type Parsable, Ref, type RefDelTask, type RefTask, Result, type ResultHandler, type Serializable, Some, type SomeOf, type SomeOfAll, type SomeValOf, type SomeValOfAll, type TypeGuard, Unsafe, allO, allR, anyO, anyR, clone, flag, isBranded, isBrandedStruct, panic, toString, wrap, wrapAsync };

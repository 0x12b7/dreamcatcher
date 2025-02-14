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

type Unsafe = RecoveryWrapper<unknown> & Parsable;
declare function Unsafe(_value: unknown): Unsafe;

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
 * A wrapper for a value of type `T1` that provides a method to retrieve the wrapped value without handling.
 */
type Wrapper<T1> = {
    /**
     * ***Brief***
     * Unwraps the wrapped value of type `T1`.
     *
     * ***Requirement***
     * Does not `panic`.
     *
     * ***Example***
     * ```ts
     *  let unsafe: Unsafe = Unsafe(500n);
     *  unsafe.unwrap();
     * ```
     */
    unwrap(): T1;
};

type RecoveryWrapper<T1> = Omit<Wrapper<T1>, "unwrap"> & {
    inspect(): T1;
};

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
declare namespace BrandedStruct {
    type Task<T1 extends string> = Closure<[value: BrandedStruct<T1>], void>;
    type Handler = {
        match<T1 extends string = any>(unknown: unknown): unknown is BrandedStruct<T1>;
        match<T1 extends string = any>(unknown: unknown, task: Task<T1>): unknown is BrandedStruct<T1>;
        match<T1 extends string>(unknown: unknown, brand: T1): unknown is BrandedStruct<T1>;
        match<T1 extends string>(unknown: unknown, brand: T1, task: Task<T1>): unknown is BrandedStruct<T1>;
    };
    const Handler: Handler;
}

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
declare namespace Branded {
    type Task<T1 extends string> = Closure<[value: Branded<T1>], void>;
    type Handler = {
        match<T1 extends string = any>(unknown: unknown): unknown is Branded<T1>;
        match<T1 extends string = any>(unknown: unknown, task: Task<T1>): unknown is Branded<T1>;
        match<T1 extends string>(unknown: unknown, brand: T1): unknown is Branded<T1>;
        match<T1 extends string>(unknown: unknown, brand: T1, task: Task<T1>): unknown is Branded<T1>;
    };
    const Handler: Handler;
}

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
declare function Dyn<T1, T2 extends Array<unknown>>(_constructor: Closure<T2, T1>, _onDeAlloc: Closure<[T1], T1>, _load: bigint, ..._onLoadPayload: T2): Dyn.Constructor<T1, T2>;
declare namespace Dyn {
    type Constructor<T1, T2 extends Array<unknown>> = Closure<T2, Dyn<T1>>;
    type Wrapper<T1> = {
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
}
type Alloc<T1> = Dyn.Wrapper<T1> & Some<T1> & Wrapper<T1>;
declare function Alloc<T1>(_value: T1, _dyn: Dyn.Wrapper<T1>): Alloc<T1>;
type DeAlloc<T1> = None & Dyn.Wrapper<T1>;
/**
 * ***Brief***
 * The deallocated state of an allocated resource.
 */
declare function DeAlloc<T1>(_dyn: Dyn.Wrapper<T1>): DeAlloc<T1>;

type Vec<T1 extends Fpv.Decimals> = {
    decimals(): T1;
    x(): Fpv<T1>;
    y(): Fpv<T1>;
    distanceFrom(origin: Vec<T1>): Fpv.Result<Fpv<T1>>;
};
declare function Vec<T1 extends Fpv.Decimals, T2 extends T1 = T1>(_x: Fpv.Compatible<T1>, _y: Fpv.Compatible<T2>, _decimals: T1): Vec<T1>;
declare namespace Vec { }

type Result$0<T1, T2> = Result<T1, T2>;
type Fpv<T1 extends Fpv.Decimals> = Wrapper<bigint> & {
    decimals(): T1;
    representation(): bigint;
    eq(x: bigint): boolean;
    eq(x: Fpv<T1>): boolean;
    eq(x: Fpv.Compatible<T1>): boolean;
    lt(x: bigint): boolean;
    lt(x: Fpv<T1>): boolean;
    lt(x: Fpv.Compatible<T1>): boolean;
    gt(x: bigint): boolean;
    gt(x: Fpv<T1>): boolean;
    gt(x: Fpv.Compatible<T1>): boolean;
    lteq(x: bigint): boolean;
    lteq(x: Fpv<T1>): boolean;
    lteq(x: Fpv.Compatible<T1>): boolean;
    gteq(x: bigint): boolean;
    gteq(x: Fpv<T1>): boolean;
    gteq(x: Fpv.Compatible<T1>): boolean;
    add(x: bigint): Fpv<T1>;
    add(x: Fpv<T1>): Fpv<T1>;
    add(x: Fpv.Compatible<T1>): Fpv<T1>;
    sub(x: bigint): Fpv<T1>;
    sub(x: Fpv<T1>): Fpv<T1>;
    sub(x: Fpv.Compatible<T1>): Fpv<T1>;
    mul(x: bigint): Fpv<T1>;
    mul(x: Fpv<T1>): Fpv<T1>;
    mul(x: Fpv.Compatible<T1>): Fpv<T1>;
    div(x: bigint): Fpv.Result<Fpv<T1>>;
    div(x: Fpv<T1>): Fpv.Result<Fpv<T1>>;
    div(x: Fpv.Compatible<T1>): Fpv.Result<Fpv<T1>>;
    pow(x: bigint): Fpv.Result<Fpv<T1>>;
    pow(x: Fpv<T1>): Fpv.Result<Fpv<T1>>;
    pow(x: Fpv.Compatible<T1>): Fpv.Result<Fpv<T1>>;
    sqrt(): Fpv.Result<Fpv<T1>>;
    convert<T2 extends Fpv.Decimals>(decimals: T2): Fpv.Result<Fpv<T2>>;
};
/**
 * ***Warning***
 * Does not support negative `decimals`.
 */
declare function Fpv<T1 extends Fpv.Decimals>(_v: Fpv.Compatible<T1>, _decimals: T1): Fpv.Result<Fpv<T1>>;
declare namespace Fpv {
    type Result<T1> = Result$0<T1, ErrorCode>;
    type ErrorCode = "FPV.ERR_DIVISION_BY_ZERO" | "FPV.ERR_NEGATIVE_DECIMALS" | "FPV.ERR_NEGATIVE_EXPONENT" | "FPV.ERR_CANNOT_SQUARE_NAGATIVE";
    type Compatible<T1 extends Decimals = Decimals> = Fpv<T1> | bigint;
    type Decimals = bigint;
    type Calculator = {
        unwrap(value: Compatible<Decimals>): bigint;
        eq<T1 extends Decimals>(x: bigint, y: bigint): boolean;
        eq<T1 extends Decimals>(x: Fpv<T1>, y: bigint): boolean;
        eq<T1 extends Decimals>(x: bigint, y: Fpv<T1>): boolean;
        eq<T1 extends Decimals, T2 extends T1 = T1>(x: Fpv<T1>, y: Fpv<T2>): boolean;
        eq<T1 extends Decimals, T2 extends T1 = T1>(x: Compatible<T1>, y: Compatible<T2>): boolean;
        lt<T1 extends Decimals>(x: bigint, y: bigint): boolean;
        lt<T1 extends Decimals>(x: Fpv<T1>, y: bigint): boolean;
        lt<T1 extends Decimals>(x: bigint, y: Fpv<T1>): boolean;
        lt<T1 extends Decimals, T2 extends T1 = T1>(x: Fpv<T1>, y: Fpv<T2>): boolean;
        lt<T1 extends Decimals, T2 extends T1 = T1>(x: Compatible<T1>, y: Compatible<T2>): boolean;
        gt<T1 extends Decimals>(x: bigint, y: bigint): boolean;
        gt<T1 extends Decimals>(x: Fpv<T1>, y: bigint): boolean;
        gt<T1 extends Decimals>(x: bigint, y: Fpv<T1>): boolean;
        gt<T1 extends Decimals, T2 extends T1 = T1>(x: Fpv<T1>, y: Fpv<T2>): boolean;
        gt<T1 extends Decimals, T2 extends T1 = T1>(x: Compatible<T1>, y: Compatible<T2>): boolean;
        lteq<T1 extends Decimals>(x: bigint, y: bigint): boolean;
        lteq<T1 extends Decimals>(x: Fpv<T1>, y: bigint): boolean;
        lteq<T1 extends Decimals>(x: bigint, y: Fpv<T1>): boolean;
        lteq<T1 extends Decimals, T2 extends T1 = T1>(x: Fpv<T1>, y: Fpv<T1>): boolean;
        lteq<T1 extends Decimals, T2 extends T1 = T1>(x: Compatible<T1>, y: Compatible<T2>): boolean;
        gteq<T1 extends Decimals>(x: bigint, y: bigint): boolean;
        gteq<T1 extends Decimals>(x: Fpv<T1>, y: bigint): boolean;
        gteq<T1 extends Decimals>(x: bigint, y: Fpv<T1>): boolean;
        gteq<T1 extends Decimals, T2 extends T1 = T1>(x: Fpv<T1>, y: Fpv<T1>): boolean;
        gteq<T1 extends Decimals, T2 extends T1 = T1>(x: Compatible<T1>, y: Compatible<T2>): boolean;
        add<T1 extends Decimals>(x: bigint, y: bigint, decimals: T1): Result<Fpv<T1>>;
        add<T1 extends Decimals>(x: Fpv<T1>, y: bigint, decimals: T1): Result<Fpv<T1>>;
        add<T1 extends Decimals>(x: bigint, y: Fpv<T1>, decimals: T1): Result<Fpv<T1>>;
        add<T1 extends Decimals, T2 extends T1 = T1>(x: Fpv<T1>, y: Fpv<T2>, decimals: T1): Result<Fpv<T1>>;
        add<T1 extends Decimals, T2 extends T1 = T1>(x: Compatible<T1>, y: Compatible<T2>, decimals: T1): Result<Fpv<T1>>;
        sub<T1 extends Decimals>(x: bigint, y: bigint, decimals: T1): Result<Fpv<T1>>;
        sub<T1 extends Decimals>(x: Fpv<T1>, y: bigint, decimals: T1): Result<Fpv<T1>>;
        sub<T1 extends Decimals>(x: bigint, y: Fpv<T1>, decimals: T1): Result<Fpv<T1>>;
        sub<T1 extends Decimals, T2 extends T1 = T1>(x: Fpv<T1>, y: Fpv<T2>, decimals: T1): Result<Fpv<T1>>;
        sub<T1 extends Decimals, T2 extends T1 = T1>(x: Compatible<T1>, y: Compatible<T2>, decimals: T1): Result<Fpv<T1>>;
        mul<T1 extends Decimals>(x: bigint, y: bigint, decimals: T1): Result<Fpv<T1>>;
        mul<T1 extends Decimals>(x: Fpv<T1>, y: bigint, decimals: T1): Result<Fpv<T1>>;
        mul<T1 extends Decimals>(x: bigint, y: Fpv<T1>, decimals: T1): Result<Fpv<T1>>;
        mul<T1 extends Decimals, T2 extends T1 = T1>(x: Fpv<T1>, y: Fpv<T2>, decimals: T1): Result<Fpv<T1>>;
        mul<T1 extends Decimals, T2 extends T1 = T1>(x: Compatible<T1>, y: Compatible<T2>, decimals: T1): Result<Fpv<T1>>;
        div<T1 extends Decimals>(x: bigint, y: bigint, decimals: T1): Result<Fpv<T1>>;
        div<T1 extends Decimals>(x: Fpv<T1>, y: bigint, decimals: T1): Result<Fpv<T1>>;
        div<T1 extends Decimals>(x: bigint, y: Fpv<T1>, decimals: T1): Result<Fpv<T1>>;
        div<T1 extends Decimals, T2 extends T1 = T1>(x: Fpv<T1>, y: Fpv<T2>, decimals: T1): Result<Fpv<T1>>;
        div<T1 extends Decimals, T2 extends T1 = T1>(x: Compatible<T1>, y: Compatible<T2>, decimals: T1): Result<Fpv<T1>>;
        pow<T1 extends Decimals>(x: bigint, y: bigint, decimals: T1): Result<Fpv<T1>>;
        pow<T1 extends Decimals>(x: Fpv<T1>, y: bigint, decimals: T1): Result<Fpv<T1>>;
        pow<T1 extends Decimals>(x: bigint, y: Fpv<T1>, decimals: T1): Result<Fpv<T1>>;
        pow<T1 extends Decimals, T2 extends T1 = T1>(x: Fpv<T1>, y: Fpv<T2>, decimals: T1): Result<Fpv<T1>>;
        pow<T1 extends Decimals, T2 extends T1 = T1>(x: Compatible<T1>, y: Compatible<T2>, decimals: T1): Result<Fpv<T1>>;
        sqrt<T1 extends Decimals>(x: bigint, decimals: T1): Result<Fpv<T1>>;
        sqrt<T1 extends Decimals>(x: Fpv<T1>, decimals: T1): Result<Fpv<T1>>;
        sqrt<T1 extends Decimals>(x: Compatible<T1>, decimals: T1): Result<Fpv<T1>>;
        convert<T1 extends Decimals, T2 extends Decimals>(x: bigint, oldDecimals: T1, newDecimals: T2): Result<Fpv<T2>>;
        convert<T1 extends Decimals, T2 extends Decimals>(x: Fpv<T1>, oldDecimals: T1, newDecimals: T2): Result<Fpv<T2>>;
        convert<T1 extends Decimals, T2 extends Decimals>(x: Compatible<T1>, oldDecimals: T1, newDecimals: T2): Result<Fpv<T2>>;
    };
    const Calculator: Calculator;
}

declare namespace Ref {
    type Task<T1> = Closure<[new: T1, old: T1], void>;
    type DeletionTask = Closure<[], void>;
}
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
    onChange(task: Ref.Task<T1>): Ref.DeletionTask;
};
/**
 * ***Brief***
 * Wrapper that supports mutation and change tracking.
 */
declare function Ref<T1>(_value: T1): Ref<T1>;

type DomError = Error<DomError.Code>;
declare function DomError(): DomError;
declare function DomError(_legacy: DOMException): DomError;
declare namespace DomError {
    type Code = "DOM.ERR_INDEX_SIZE" | "DOM.ERR_HIERARCHY_REQUEST" | "DOM.ERR_WRONG_DOCUMENT" | "DOM.ERR_INVALID_CHARACTER" | "DOM.ERR_NO_MODIFICATION_ALLOWED" | "DOM.ERR_NOT_FOUND" | "DOM.ERR_NOT_SUPPORTED" | "DOM.ERR_INVALID_STATE" | "DOM.ERR_ATTRIBUTE_IN_USE" | "DOM.ERR_SYNTAX" | "DOM.ERR_INVALID_MODIFICATION" | "DOM.ERR_NAMESPACE" | "DOM.ERR_INVALID_ACCESS" | "DOM.ERR_TYPE_MISMATCH" | "DOM.ERR_SECURITY" | "DOM.ERR_NETWORK" | "DOM.ERR_ABORT" | "DOM.ERR_URL_MISMATCH" | "DOM.ERR_QUOTA_EXCEEDED" | "DOM.ERR_TIMEOUT" | "DOM.ERR_INVALID_NODE_TYPE" | "DOM.ERR_DATA_CLONE" | "DOM.ERR_ENCODING" | "DOM.ERR_NOT_READABLE" | "DOM.ERR_UNKNOWN" | "DOM.ERR_CONSTRAINT" | "DOM.ERR_DATA" | "DOM.ERR_TRANSACTION_INACTIVE" | "DOM.ERR_READ_ONLY" | "DOM.ERR_VERSION" | "DOM.ERR_OPERATION" | "DOM.ERR_NOT_ALLOWED";
    namespace Exception {
        const NameRemap: Record<Name, DomError.Code>;
        const CodeRemap: Record<Code, DomError.Code>;
        type Name = "EncodingError" | "NotReadableError" | "UnknownError" | "ConstraintError" | "DataError" | "TransactionInactiveError" | "ReadOnlyError" | "VersionError" | "OperationError" | "NotAllowedError";
        type Code = 1 | 3 | 4 | 5 | 7 | 8 | 9 | 11 | 12 | 13 | 14 | 17 | 18 | 19 | 20 | 21 | 22 | 23 | 24 | 25;
    }
}

type Array$0<T1> = Array<T1>;
type Error<T1 extends string, T2 = unknown> = BrandedStruct<"Error"> & {
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
declare function Error<T1 extends string, T2 = unknown>(_configuration: Error.Configuration<T1, T2>): Error<T1, T2>;
declare function Error<T1 extends string, T2 = unknown>(_code: T1, _message?: string, _payload?: T2): Error<T1, T2>;
declare namespace Error {
    type Configuration<T1 extends string, T2 = unknown> = {
        code: T1;
        message?: string;
        payload?: T2;
        stack?: string;
        handler?: Error.Handler;
    };
    type Task<T1 extends string, T2 = unknown> = Closure<[e: Error<T1, T2>], void>;
    type Handler = {
        match(unknown: unknown): unknown is Error<any, unknown>;
        match(unknown: unknown, task: Task<any>): unknown is Error<any, unknown>;
        match<T1 extends string>(unknown: unknown, code: T1): unknown is Error<T1, unknown>;
        match<T1 extends string>(unknown: unknown, code: T1, task: Task<T1>): unknown is Error<T1, unknown>;
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
        panic<T1 extends string>(e: Error<T1>, handler?: Handler): never;
        panic<T1 extends string>(code: T1, at?: Function, handler?: Handler): never;
        localStackTrace(at: Function): Option<string>;
    };
    const Handler: Handler;
}
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
declare namespace Result {
    type Async<T1, T2> = Promise<Result<T1, T2>>;
    type Array<T1, T2> = Array$0<Result<T1, T2>>;
    type Handler = {
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
        all<T1 extends Array<unknown, unknown>>(results: T1): Result<Ok.ValFromAll<T1>, Err.ValFromAll<T1>[number]>;
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
        any<T1 extends Array<unknown, unknown>>(results: T1): Result<Ok.ValFromAll<T1>[number], Err.ValFromAll<T1>>;
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
        wrap<T1, T2, T3 extends Array$0<T2>>(task: Closure<T3, T1>, ...payload: T3): Result<T1, Unsafe>;
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
        wrapAsync<T1, T2, T3 extends Array$0<T2>>(task: AsyncClosure<T3, T1>, ...payload: T3): Promise<Result<T1, Unsafe>>;
    };
    const Handler: Handler;
}
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
    expect(): T1;
    expect(__: unknown): T1;
    expect(__?: unknown): T1;
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
    expectErr(): never;
    expectErr(message: string): never;
    expectErr(message?: string): never;
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
    and<T2>(task: Closure<[T1], Ok<T2>>): Ok<T2>;
    and<T2>(task: Closure<[T1], Err<T2>>): Result<T1, T2>;
    and<T2, T3>(task: Closure<[T1], Result<T2, T3>>): Result<T2, T3>;
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
    map<T2>(task: Closure<[T1], T2>): Ok<T2>;
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
declare namespace Ok {
    type From<T1 extends Result<unknown, unknown>> = T1 extends Ok<infer T2> ? Ok<T2> : never;
    type FromAll<T1 extends Array<Result<unknown, unknown>>> = {
        [T2 in keyof T1]: T1[T2] extends Ok<unknown> ? From<T1[T2]> : never;
    };
    type ValFrom<T1 extends Result<unknown, unknown>> = T1 extends Ok<infer T2> ? T2 : never;
    type ValFromAll<T1 extends Array<Result<unknown, unknown>>> = {
        [T2 in keyof T1]: ValFrom<T1[T2]>;
    };
}
type Err<T1> = RecoveryWrapper<T1> & {
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
    expect(): never;
    expect(message: string): never;
    expect(message?: string): never;
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
    expectErr(): T1;
    expectErr(__: unknown): T1;
    expectErr(__?: unknown): T1;
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
    mapErr<T2>(task: Closure<[T1], T2>): Err<T2>;
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
    recover<T2>(task: Closure<[T1], T2>): Ok<T2>;
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
declare function Err<T1>(_value: T1, _handler: Error.Handler): Err<T1>;
declare namespace Err {
    type From<T1 extends Result<unknown, unknown>> = T1 extends Err<infer T2> ? Err<T2> : never;
    type FromAll<T1 extends Array<Result<unknown, unknown>>> = {
        [T2 in keyof T1]: T1[T2] extends Err<unknown> ? From<T1[T2]> : never;
    };
    type ValFrom<T1 extends Result<unknown, unknown>> = T1 extends Err<infer T2> ? T2 : never;
    type ValFromAll<T1 extends Array<Result<unknown, unknown>>> = {
        [T2 in keyof T1]: ValFrom<T1[T2]>;
    };
}
/**
 * ***Brief***
 * A type that represents an optional value, encapsulating either a value `Some`
 * or the absence of a value `None`.
 */
type Option<T1> = Some<T1> | None;
declare namespace Option {
    type Async<T1> = Promise<Option<T1>>;
    type Array<T1> = Array$0<Option<T1>>;
    /**
     * ***Brief***
     * Utility class for handling tasks within `Option`.
     */
    type Handler = {
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
        all<T1 extends Option.Array<unknown>>(...options: T1): Option<Some.ValFromAll<T1>>;
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
        any<T1 extends Option.Array<unknown>>(...options: T1): Option<Some.ValFromAll<T1>[number]>;
    };
    const Handler: Handler;
}
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
    expect(): T1;
    expect(__: unknown): T1;
    expect(__?: unknown): T1;
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
    and<T2>(task: Closure<[T1], Option<T2>>): Option<T2>;
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
    map<T2>(task: Closure<[T1], T2>): Some<T2>;
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
declare namespace Some {
    type From<T1 extends Option<unknown>> = T1 extends Some<infer T2> ? Some<T2> : never;
    type FromAll<T1 extends Array<Option<unknown>>> = {
        [T2 in keyof T1]: T1[T2] extends Some<unknown> ? From<T1[T2]> : never;
    };
    type ValFrom<T1 extends Option<unknown>> = T1 extends Some<infer T2> ? T2 : never;
    type ValFromAll<T1 extends Array<Option<unknown>>> = {
        [T2 in keyof T1]: ValFrom<T1[T2]>;
    };
}
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
    expect(): never;
    expect(message: string): never;
    expect(message?: string): never;
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
declare const flag: typeof Option.Handler.flag;
declare const allO: typeof Option.Handler.all;
declare const anyO: typeof Option.Handler.any;
declare const allR: typeof Result.Handler.all;
declare const anyR: typeof Result.Handler.any;
declare const wrap: typeof Result.Handler.wrap;
declare const wrapAsync: typeof Result.Handler.wrapAsync;

export { Alloc, type AsyncClosure, type AsyncFunction, Branded, BrandedStruct, type Closure, DeAlloc, Dyn, Err, Error, Fpv, type Function$1 as Function, type MaybeAsync, None, Ok, Option, type Parsable, Ref, Result, type Serializable, Some, type TypeGuard, Unsafe, Vec, allO, allR, anyO, anyR, clone, flag, toString, wrap, wrapAsync };

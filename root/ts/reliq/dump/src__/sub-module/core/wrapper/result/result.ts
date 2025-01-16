

// #region Common

const _EMAIL: string = "dreamcatcher_foundation@proton.me";

const _INTERNAL_ERROR_MESSAGE: string =
    "\n" + "Uh-oh, looks like Reliq took a wrong turn!" + 
    "\n" + "Don't worry, it's not you-it's us." + 
    "\n" + `Please report this at ${ _EMAIL }.` +
    "\n";


// #region Common Util Type

/**
 * **Note**
 * 
 */
export type AsyncClosure<T1 extends Array<unknown>, T2> = Closure<T1, T2>;

/**
 * **Note**
 * Like a function but spreads the payload.
 */
export type Closure<T1 extends Array<unknown>, T2> = (...payload: T1) => T2;


// #region Result

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
export type Result<T1, T2> = Ok<T1> | Err<T2>;


export type ResultArray<T1, T2> = Array<Result<T1, T2>>;

export type ResultBrand = "Ok" | "Err";

type AsyncResult<T1, T2> = Promise<Result<T1, T2>>;


/**
 * **NOTE**
 * A util `class` to handle `Result`. 
 */
export type ResultHandler = {

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

export const Result: ResultHandler = (() => {
    /** @constructor */ {
        return { all, any, wrap, wrapAsync };
    }

    function all<T1 extends ResultArray<unknown, unknown>>(...results: T1): Result<OkValOfAll<T1>, ErrValOfAll<T1>[number]> {
        let out: Array<unknown> = [];
        let i: number = 0;
        while (i < results.length) {
            let result: Result<unknown, unknown> = results.at(i)!;
            if (result.ok()) out.push(result.unwrapSafely());
            else return result as Err<ErrValOfAll<T1>[number]>;
            i ++;
        }
        return Ok((out as OkValOfAll<T1>));
    }

    function any<T1 extends Array<Result<unknown, unknown>>>(...results: T1): Result<OkValOfAll<T1>[number], ErrValOfAll<T1>> {
        let out: Array<unknown> = [];
        let i: number = 0;
        while (i < results.length) {
            let wrapper: Result<unknown, unknown> = results.at(i)!;
            if (wrapper.ok()) return wrapper as Ok<OkValOfAll<T1>[number]>;
            else out.push(wrapper.inspect());
            i ++;
        }
        return Err((out as ErrValOfAll<T1>));
    }
    
    function wrap<T1, T2, T3 extends Array<T2>>(operation: Closure<T3, T1>, ...payload: T3): Result<T1, Unsafe> {
        try {
            return Ok(operation(...payload));
        }
        catch (e) {
            return Err(Unsafe(e));
        }
    }

    async function wrapAsync<T1 extends Promise<unknown>, T2, T3 extends Array<T2>>(operation: AsyncClosure<T3, T1>, ...payload: T3): Promise<Result<Awaited<T1>, Unsafe>> {
        try {
            return Ok((await operation(...payload)));
        }
        catch (e) {
            return Err(Unsafe(e));
        }
    }
})();


// #region Err

export type ErrOfAll<T1 extends ResultArray<unknown, unknown>> = {
    [T2 in keyof T1]: T1[T2] extends Err<unknown> ? ErrOf<T1[T2]> : never
};

export type ErrOf<T1 extends Result<unknown, unknown>> = T1 extends Err<infer T2> ? Err<T2> : never;

export type ErrValOfAll<T1 extends ResultArray<unknown, unknown>> = {
    [T2 in keyof T1]: T1[T2] extends Err<unknown> ? ErrValOf<T1[T2]> : never
};

export type ErrValOf<T1 extends Result<unknown, unknown>> = T1 extends Err<infer T2> ? T2 : never;

export type Err<T1> = 
    & Branded<"Err">
    & RecoveryWrapper<T1>
    & Serializable
    & Displayable
    & {
    ok(): this is Ok<unknown>;
    err(): this is Err<T1>;
    inspect(): T1;
    stack(): string;
    expect(message: string): never;
    expectErr(__: unknown): T1;
    and(__: unknown): Err<T1>;
    map(__: unknown): Err<T1>;
    mapErr<T2>(operation: Function<T1, T2>): Err<T2>;
    resolve<T2>(operation: Function<T1, T2>): Ok<T2>;
    toOption(): Option<never>;
};

export function Err<T1>(_value: T1): Err<T1> {
    let _this: Err<T1>;
    let _stack: string;
    
    /** @constructor */ {
        let e: Error = Error();
        Error.captureStackTrace(e, Err);
        _stack = e.stack ?? "";
        return _this = {
            type,
            ok,
            err,
            inspect,
            stack,
            expect,
            expectErr,
            unwrap,
            unwrapOr,
            and,
            map,
            mapErr,
            toOption,
            toString,
            display
        };
    }

    function type(): "Err" {
        return "Err";
    }

    function ok(): this is Ok<unknown> {
        return false;
    }

    function err(): this is Err<T1> {
        return true;
    }

    function inspect(): T1 {
        return _value;
    }

    function stack(): string {
        return _stack;
    }

    function expect(message: string): never {
        throw message + "\n" + stack();
    }

    function expectErr(__: unknown): T1 {
        return inspect();
    }

    function unwrap(): never {
        let value0: T1 = inspect();
        if (
            value0 !== null
            && value0 !== undefined
            && typeof value0 === "object"
            && "code" in value0
            && "message" in value0
            && typeof value0.code === "string"
            && isOption(value0.message)
        ) {
            value0.message.map(message => {
                throw value0.code + ":" + " " + message + "\n" + stack();
            });
            throw value0.code + "\n" + stack();
        }
        throw $toString(inspect()) + "\n" + stack();
    }

    function unwrapOr<T2>(alternative: T2): T2 {
        return alternative;
    }

    function and(__: unknown): Err<T1> {
        return _this;
    }

    function map(__: unknown): Err<T1> {
        return _this;
    }

    function mapErr<T2>(operation: Function<T1, T2>): Err<T2> {
        return Err(operation(inspect()));
    }

    function toOption(): Option<never> {
        return None;
    }

    function toString(): string {
        return type() + "(" + $toString(inspect()) + ")" + "\n" + stack();
    }

    function display(): void {
        return console.log(toString());
    }
}


// #region Ok

export type Ok<T1> = 
    & Branded<"Ok">
    & ValidatedWrapper<T1>
    & Serializable
    & Displayable
    & {
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
    resolve(__: unknown): Ok<T1>;
    
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

export function Ok<T1>(_value: T1): Ok<T1> {
    let _this: Ok<T1>;

    /** @constructor */ {
        return _this = {
            type,
            ok,
            err,
            expect,
            expectErr,
            unwrap,
            unwrapOr,
            unwrapSafely,
            and,
            map,
            mapErr,
            toOption,
            toString,
            display
        };
    }

    function type(): "Ok" {
        return "Ok";
    }

    function ok(): this is Ok<T1> {
        return true;
    }

    function err(): this is Err<unknown> {
        return false;
    }

    function expect(__: unknown): T1 {
        return _value;
    }

    function expectErr(message: string): never {
        panic(message, expectErr);
    }

    function unwrap(): T1 {
        return _value;
    }

    function unwrapOr(__: unknown): T1 {
        return _value;
    }

    function unwrapSafely(): T1 {
        return _value;
    }

    function and<T2>(operation: Function<T1, Ok<T2>>): Ok<T2>;
    function and<T2>(operation: Function<T1, Err<T2>>): Result<T1, T2>;
    function and<T2, T3>(operation: Function<T1, Result<T2, T3>>): Result<T2, T3>;
    function and<T2, T3>(operation: Function<T1, Result<T2, T3>>): Result<T2, T3> {
        return operation(_value);
    }

    function map<T2>(operation: Function<T1, T2>): Ok<T2> {
        return Ok(operation(_value));
    }

    function mapErr(__: unknown): Ok<T1> {
        return _this;
    }

    function toOption(): Option<T1> {
        return Some(_value);
    }

    function toString(): string {
        return type() + "(" + $toString(_value) + ")";
    }

    function display(): void {
        return console.log(toString());
    }
}




// #region Option

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
export type Option<T1> = Some<T1> | None;




// #region None

export type None = 
    & Branded<"None">
    & RecoveryWrapper<never>
    & Serializable
    & Displayable 
    & {
    some(): this is Some<unknown>;
    none(): this is None;
    expect(message: string): never;
    and(__: unknown): None;
    map(__: unknown): None;
    toResult<T1>(value: T1): Err<T1>;
};

export const None: None = (() => {
    let _this: None;

    /** @constructor */ {
        return _this = {
            type,
            some,
            none,
            expect,
            unwrap,
            unwrapOr,
            and,
            map,
            toResult,
            toString,
            display
        };
    }
    function type(): "None" {
        return "None";
    }
    
    function some(): this is Some<unknown> {
        return false;
    }

    function none(): this is None {
        return true;
    }

    function expect(message: string): never {
        panic(message, expect);
    }

    function unwrap(): never {
        panic(type());
    }

    function unwrapOr<T1>(fallback: T1): T1 {
        return fallback;
    }

    function and(__: unknown): None {
        return _this;
    }

    function map(__: unknown): None {
        return _this;
    }

    function toResult<T1>(value: T1): Err<T1> {
        return Err(value);
    }

    function toString(): string {
        return type();
    }

    function display(): void {
        return console.log(toString());
    }
})();



// #region Some

type Some<T1> =
    & Branded<"Some">
    & ValidatedWrapper<T1>
    & Serializable
    & Displayable
    & {

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

function Some<T1>(_value: T1): Some<T1> {
    /** @constructor */ {
        return {
            type,
            some,
            none,
            expect,
            unwrap,
            unwrapOr,
            unwrapSafely,
            and,
            map,
            toResult,
            toString,
            display
        };
    }

    function type(): "Some" {
        return "Some";
    }

    function some(): this is Some<T1> {
        return true;
    }

    function none(): this is None {
        return false;
    }

    function expect(__: unknown): T1 {
        return _value;
    }

    function unwrap(): T1 {
        return _value;
    }

    function unwrapOr(__: unknown): T1 {
        return _value;
    }

    function unwrapSafely(): T1 {
        return _value;
    }

    function and<T2>(operation: Function<T1, Option<T2>>): Option<T2> {
        return operation(_value);
    }

    function map<T2>(operation: Function<T1, T2>): Some<T2> {
        return Some(operation(_value));
    }

    function toResult(__: unknown): Ok<T1> {
        return Ok(_value);
    }

    function toString(): string {
        return type() + "(" + $toString(_value) + ")";
    }

    function display(): void {
        return console.log(toString());
    }
}


// #region Unsafe

export type UnsafeBrand = "Unsafe";

export type AsyncUnsafe = Promise<Unsafe>;

export type Unsafe =
    & Branded<"Unsafe">
    & Wrapper<unknown>
    & Parsable
    & {
    toString(): string;
};

export function Unsafe(_value: unknown): Unsafe {
    /** @constructor */ {
        return {
            type,
            unwrap,
            parse,
            toString
        };
    }

    function type(): "Unsafe" {
        return "Unsafe";
    }

    function unwrap(): unknown {
        return _value;
    }

    function parse<T1>(guard: TypeGuard<T1>): Option<T1> {
        if (!guard(unwrap())) return None;
        return Some((unwrap() as T1));
    }

    function toString(): string {
        return type() + "(" + $toString(unwrap()) + ")";
    }
}
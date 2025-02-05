import type { AsyncClosure } from "@root";
import type { Closure } from "@root";
import type { Function as Function0 } from "@root";
import type { Wrapper } from "@root";
import type { RecoveryWrapper } from "@root";
import { Branded } from "@root";
import { BrandedStruct } from "@root";
import { Unsafe } from "@root";


export const flag: typeof Option.Handler.flag = Option.Handler.flag;

export const allO: typeof Option.Handler.all = Option.Handler.all;

export const anyO: typeof Option.Handler.any = Option.Handler.any;

export const allR = Result.Handler.all;

export const anyR = Result.Handler.any;

export const wrap = Result.Handler.wrap;

export const wrapAsync = Result.Handler.wrapAsync;


type _Array<T1> = Array<T1>;

type _Error = ReturnType<ErrorConstructor>;

const _Error: ErrorConstructor = globalThis.Error;


export type Error<T1 extends string, T2 = unknown> = 
    & BrandedStruct<"Error">
    & {

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
export function Error<T1 extends string, T2 = unknown>(_configuration: Error.Configuration<T1, T2>): Error<T1, T2>;
export function Error<T1 extends string, T2 = unknown>(_code: T1, _message?: string, _payload?: T2): Error<T1, T2>;
export function Error<T1 extends string, T2 = unknown>(
    _p0: Error.Configuration<T1, T2> | T1,
    _p1?: string,
    _p2?: T2
): Error<T1, T2> {
    /** @constructor */ {
        if (typeof _p0 === "object") {
            let configuration: Error.Configuration<T1, T2> = _p0;
            let handler: Error.Handler = flag(configuration.handler).unwrapOr(Error.Handler);
            return {
                type: "Error",
                code: configuration.code,
                message: Option.Handler.flag(configuration.message),
                payload: Option.Handler.flag(configuration.payload),
                stack: Option.Handler.flag(configuration.stack).unwrapOr(handler.localStackTrace(Error).unwrapOr(""))
            };
        }
        return {
            type: "Error",
            code: _p0,
            message: Option.Handler.flag(_p1),
            payload: Option.Handler.flag(_p2),
            stack: Error.Handler.localStackTrace(Error).unwrapOr("")
        };
    }
}

export namespace Error {
    export type Configuration<T1 extends string, T2 = unknown> = {
        code: T1;
        message?: string;
        payload?: T2;
        stack?: string;
        handler?: Error.Handler;
    };

    export type Task<T1 extends string, T2 = unknown> = Closure<[e: Error<T1, T2>], void>;

    export type Handler = {
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

    export const Handler: Handler = (() => {
        let _this: Handler;

        /** @constructor */ {
            return _this = { match, panic, localStackTrace };
        }

        function match(unknown: unknown): unknown is Error<any, unknown>;
        function match(unknown: unknown, task: Task<any>): unknown is Error<any, unknown>;
        function match<T1 extends string>(unknown: unknown, code: T1): unknown is Error<T1, unknown>;
        function match<T1 extends string>(unknown: unknown, code: T1, task: Task<T1>): unknown is Error<T1, unknown>;
        function match<T1 extends string>(
            p0: unknown,
            p1?: T1 | Closure<[e: Error<T1, unknown>], void>,
            p2?: Closure<[e: Error<T1, unknown>], void>
        ): p0 is Error<T1, unknown> {
            let unknown: unknown = p0;
            if (!BrandedStruct.Handler.match(unknown)) return false;
            if (typeof p1 === "string") {
                let code: T1 = p1;
                if (!BrandedStruct.Handler.match(unknown, code)) return false;
            }
            let value: Error<T1> = (unknown as Error<T1>);
            if (typeof p1 === "function") {
                let task: Task<T1> = p1;
                task(value);
                return true;
            }
            if (typeof p2 === "function") {
                let task: Task<T1> = p2;
                task(value);
                return true;
            }
            return true;
        }

        function panic<T1 extends string>(e: Error<T1>, handler?: Handler): never;
        function panic<T1 extends string>(code: T1, at?: Function, handler?: Handler): never;
        function panic<T1 extends string>(
            p0: Error<T1> | T1,
            p1?: Handler | Function,
            p2?: Handler
        ): never {
            if (typeof p0 === "object") {
                let e: Error<T1> = p0;
                let handler: Handler = flag((p1 as Handler | undefined)).unwrapOr(_this);
                throw [

                ].join("\n");
            }
            let code: T1 = p0;
            let at: Function = flag((p1 as Function | undefined)).unwrapOr(panic);
            let handler: Handler = flag(p2).unwrapOr(_this);
            throw code + "\n" + handler.localStackTrace(at);
        }

        function localStackTrace(location: Function): Option<string> {
            let e: ReturnType<typeof _Error> = _Error();
            _Error.captureStackTrace(e, location);
            if (e.stack) return Some(e.stack);
            return None;
        }
    })();
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
export type Result<T1, T2> = Ok<T1> | Err<T2>;

export namespace Result {
    export type Async<T1, T2> = Promise<Result<T1, T2>>;

    export type Array<T1, T2> = _Array<Result<T1, T2>>;

    export type Handler = {
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
        wrap<T1, T2, T3 extends _Array<T2>>(task: Closure<T3, T1>, ...payload: T3): Result<T1, Unsafe>;
        
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
        wrapAsync<T1, T2, T3 extends _Array<T2>>(task: AsyncClosure<T3, T1>, ...payload: T3): Promise<Result<T1, Unsafe>>;
    };

    export const Handler: Handler = (() => {
        /** @constructor */ {
            return { all, any, wrap, wrapAsync };
        }

        function all<T1 extends Array<unknown, unknown>>(results: T1): Result<Ok.ValFromAll<T1>, Err.ValFromAll<T1>[number]> {
            let out: _Array<unknown> = [];
            let i: number = 0;
            while (i < results.length) {
                let result: Result<unknown, unknown> = results.at(i)!;
                if (result.ok()) out.push(result.unwrap());
                else return result as Err<Err.ValFromAll<T1>[number]>;
                i ++;
            }
            return Ok((out as Ok.ValFromAll<T1>));
        }
    
        function any<T1 extends Array<unknown, unknown>>(results: T1): Result<Ok.ValFromAll<T1>[number], Err.ValFromAll<T1>> {
            let out: _Array<unknown> = [];
            let i: number = 0;
            while (i < results.length) {
                let wrapper: Result<unknown, unknown> = results.at(i)!;
                if (wrapper.ok()) return wrapper as Ok<Ok.ValFromAll<T1>[number]>;
                else out.push(wrapper.inspect());
                i ++;
            }
            return Err((out as Err.ValFromAll<T1>));
        }
        
        function wrap<T1, T2, T3 extends _Array<T2>>(task: Closure<T3, T1>, ...payload: T3): Result<T1, Unsafe> {
            try {
                return Ok(task(...payload));
            }
            catch (e) {
                return Err(Unsafe(e));
            }
        }
    
        async function wrapAsync<T1, T2, T3 extends _Array<T2>>(task: AsyncClosure<T3, T1>, ...payload: T3): Promise<Result<T1, Unsafe>> {
            try {
                return Ok((await task(...payload)));
            }
            catch (e) {
                return Err(Unsafe(e));
            }
        }
    })();
}


export type Ok<T1> = 
    & Wrapper<T1>
    & {

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
    degrade<T2>(task: Function0<T1, T2>): Err<T2>;

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
export function Ok<T1>(_value: T1): Ok<T1> {
    let _this: Ok<T1>;

    /** @constructor */ {
        return _this = {
            ok,
            err,
            expect,
            expectErr,
            unwrap,
            unwrapOr,
            and,
            map,
            mapErr,
            recover,
            degrade,
            toOption
        };
    }

    function ok(): this is Ok<T1> {
        return true;
    }

    function err(): this is Err<unknown> {
        return false;
    }

    function expect(__: unknown): T1 {
        return unwrap();
    }

    function expectErr(message: string): never {
        Error.Handler.panic(Error("PANIC", message));
    }

    function unwrap(): T1 {
        return _value;
    }

    function unwrapOr(__: unknown): T1 {
        return unwrap();
    }

    function and<T2>(task: Closure<[T1], Ok<T2>>): Ok<T2>;
    function and<T2>(task: Closure<[T1], Err<T2>>): Result<T1, T2>;
    function and<T2, T3>(task: Closure<[T1], Result<T2, T3>>): Result<T2, T3>;
    function and<T2, T3>(task: Closure<[T1], Result<T2, T3>>): Result<T2, T3> {
        return task(unwrap());
    }

    function map<T2>(task: Closure<[T1], T2>): Ok<T2> {
        return Ok(task(unwrap()));
    }

    function mapErr(__: unknown): Ok<T1> {
        return _this;
    }

    function recover(__: unknown): Ok<T1> {
        return _this;
    }

    function degrade<T2>(task: Closure<[T1], T2>): Err<T2> {
        return Err(task(unwrap()));
    }

    function toOption(): Option<T1> {
        return Some(unwrap());
    }
}

export namespace Ok {
    export type From<T1 extends Result<unknown, unknown>> = T1 extends Ok<infer T2> ? Ok<T2> : never;

    export type FromAll<T1 extends Array<Result<unknown, unknown>>> = {
        [T2 in keyof T1]: T1[T2] extends Ok<unknown> ? From<T1[T2]> : never;
    };

    export type ValFrom<T1 extends Result<unknown, unknown>> = T1 extends Ok<infer T2> ? T2 : never;

    export type ValFromAll<T1 extends Array<Result<unknown, unknown>>> = {
        [T2 in keyof T1]: ValFrom<T1[T2]>;
    };
}


export type Err<T1> = 
    & RecoveryWrapper<T1>
    & {

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
export function Err<T1>(_value: T1): Err<T1>;
export function Err<T1>(_value: T1, _handler: Error.Handler): Err<T1>;
export function Err<T1>(
    _p0: T1,
    _p1?: Error.Handler
): Err<T1> {
    let _this: Err<T1>;
    let _stack: string;
    let _value: T1;
    let _handler: Error.Handler;
    
    /** @constructor */ {
        _value = _p0;
        _handler = _p1 ?? Error.Handler;
        _stack = _handler.localStackTrace(Err).unwrapOr("");
        return _this = {
            ok,
            err,
            inspect,
            stack,
            expect,
            expectErr,
            unwrapOr,
            and,
            map,
            mapErr,
            recover,
            degrade,
            toOption
        };
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
        let e: T1 = inspect();
        let transientEO: Option<Error0<any, unknown>> = None;
        if (e instanceof Error) {
            let customE: Error0<any, unknown> = Error0({
                code: e.name.toUpperCase(),
                message: message
            });
            transientEO = Some(customE);
        }
        if (transientEO.none()) _handler.match(e, e => {
            e.message = e.message.map(message0 => {
                return message0 + 
                
                "\n" + 
                "\n     " + "Context" + 
                "\n     " + message;
            });
            transientEO = Some(e);
            return;
        });
        
        let transientE: Error0<any, unknown> = transientEO
            .toResult(undefined)
            .recover(() => {
                return Error({ code: "PANIC", message: message });
            })
            .unwrap();
        Error.Handler.panic(transientE);
    }

    function expectErr(__: unknown): T1 {
        return inspect();
    }

    function unwrapOr<T2>(fallback: T2): T2 {
        return fallback;
    }

    function and(__: unknown): Err<T1> {
        return _this;
    }

    function map(__: unknown): Err<T1> {
        return _this;
    }

    function mapErr<T2>(task: Closure<[T1], T2>): Err<T2> {
        return Err(task(inspect()));
    }

    function recover<T2>(task: Closure<[T1], T2>): Ok<T2> {
        return Ok(task(inspect()));
    }

    function degrade(__: unknown): Err<T1> {
        return _this;
    }

    function toOption(): Option<never> {
        return None;
    }
}

export namespace Err {
    export type From<T1 extends Result<unknown, unknown>> = T1 extends Err<infer T2> ? Err<T2> : never;

    export type FromAll<T1 extends Array<Result<unknown, unknown>>> = {
        [T2 in keyof T1]: T1[T2] extends Err<unknown> ? From<T1[T2]> : never
    };

    export type ValFrom<T1 extends Result<unknown, unknown>> = T1 extends Err<infer T2> ? T2 : never;

    export type ValFromAll<T1 extends Array<Result<unknown, unknown>>> = {
        [T2 in keyof T1]: ValFrom<T1[T2]>;
    };
}


/**
 * ***Brief***
 * A type that represents an optional value, encapsulating either a value `Some` 
 * or the absence of a value `None`.
 */
export type Option<T1> = Some<T1> | None;

export namespace Option {
    export type Async<T1> = Promise<Option<T1>>;

    export type Array<T1> = _Array<Option<T1>>;

    /**
     * ***Brief***
     * Utility class for handling tasks within `Option`.
     */
    export type Handler = {
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

    export const Handler: Handler = (() => {
        { return { flag, all, any }; }

        function flag<T1>(value: T1 | null | undefined): Option<T1> {
            if (value === null) return None;
            if (value === undefined) return None;
            return Some((value as T1));
        }

        function all<T1 extends Option.Array<unknown>>(...options: T1): Option<Some.ValFromAll<T1>> {
            let out: _Array<unknown> = [];
            let i: number = 0;
            while (i < options.length) {
                let option: Option<unknown> = options.at(i)!;
                if (option.none()) return option as None;
                out.push(option.unwrap());
                i ++;
            }
            return Some(out as Some.ValFromAll<T1>);
        }

        function any<T1 extends Option.Array<unknown>>(...options: T1): Option<Some.ValFromAll<T1>[number]> {
            let i: number = 0;
            while (i < options.length) {
                let option: Option<unknown> = options.at(i)!;
                if (option.some()) return option as Some<Some.ValFromAll<T1>[number]>;
                i ++;
            }
            return None;
        }
    })();
}


export type Some<T1> = 
    & Branded<"Some">
    & Wrapper<T1>
    & {

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
export function Some<T1>(_value: T1): Some<T1> {
    /** @constructor */ {
        return {
            type,
            some,
            none,
            expect,
            unwrap,
            unwrapOr,
            and,
            map,
            toResult
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

    function and<T2>(task: Closure<[T1], Option<T2>>): Option<T2> {
        return task(_value);
    }

    function map<T2>(task: Closure<[T1], T2>): Some<T2> {
        return Some(task(_value));
    }

    function toResult(__: unknown): Ok<T1> {
        return Ok(_value);
    }
}

export namespace Some {
    export type From<T1 extends Option<unknown>> = T1 extends Some<infer T2> ? Some<T2> : never;

    export type FromAll<T1 extends Array<Option<unknown>>> = {
        [T2 in keyof T1]: T1[T2] extends Some<unknown> ? From<T1[T2]> : never
    };

    export type ValFrom<T1 extends Option<unknown>> = T1 extends Some<infer T2> ? T2 : never;

    export type ValFromAll<T1 extends Array<Option<unknown>>> = {
        [T2 in keyof T1]: ValFrom<T1[T2]>;
    };
}


export type None = 
    & Branded<"None">
    & {

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
export const None: None = (() => {
    let _this: None;

    /** @constructor */ {
        return _this = {
            type,
            some,
            none,
            expect,
            unwrapOr,
            and,
            map,
            toResult
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
        Error.Handler.panic(Error("ERR_VALUE_REQUIRED", message));
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

    function toResult<T1>(e: T1): Err<T1> {
        return Err(e);
    }
})();
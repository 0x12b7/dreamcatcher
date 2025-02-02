import type { Function } from "@core";
import type { Option } from "@core";
import { ErrorHandler } from "@core";
import { Error as Error0 } from "@core";
import { Ok } from "@core";
import { None } from "@core";
import { Some } from "@core";
import { panic } from "@core";

export type Err<T1> = {

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
    mapErr<T2>(task: Function<T1, T2>): Err<T2>;

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
    recover<T2>(task: Function<T1, T2>): Ok<T2>;

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
export function Err<T1>(_value: T1, _handler: ErrorHandler): Err<T1>;
export function Err<T1>(
    _p0: T1,
    _p1: ErrorHandler = ErrorHandler
): Err<T1> {
    let _this: Err<T1>;
    let _stack: string;
    let _value: T1;
    let _handler: ErrorHandler;
    
    /** @constructor */ {
        _value = _p0;
        _handler = _p1;
        _stack = _handler.parseStackTrace(Err);
        return _this = {
            ok,
            err,
            inspect,
            stack,
            expect,
            expectErr,
            unlockOr,
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
        if (transientEO.none()) _handler.matchError(e, e => {
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
                return Error0({
                    code: "PANIC",
                    message: message
                });
            })
            .unlock();
        panic(transientE);
    }

    function expectErr(__: unknown): T1 {
        return inspect();
    }

    function unlockOr<T2>(fallback: T2): T2 {
        return fallback;
    }

    function and(__: unknown): Err<T1> {
        return _this;
    }

    function map(__: unknown): Err<T1> {
        return _this;
    }

    function mapErr<T2>(task: Function<T1, T2>): Err<T2> {
        return Err(task(inspect()));
    }

    function recover<T2>(task: Function<T1, T2>): Ok<T2> {
        return Ok(task(inspect()));
    }

    function degrade(__: unknown): Err<T1> {
        return _this;
    }

    function toOption(): Option<never> {
        return None;
    }
}
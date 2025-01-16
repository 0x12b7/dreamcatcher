import type { Ok } from "@root";
import type { Err } from "@root";

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

export type { Result };
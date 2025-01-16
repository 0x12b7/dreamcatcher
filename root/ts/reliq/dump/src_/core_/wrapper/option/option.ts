import { Some } from "@root";
import { None } from "@root";

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

export type { Option };
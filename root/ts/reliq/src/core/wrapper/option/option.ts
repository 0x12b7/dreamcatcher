import {
    Some,
    None
} from "@root";

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



let x: Option<string>;


if (x!.some()) {
    let value = x!.unlock();
    
}
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
export type TypeGuard<T1> = (unknown: unknown) => unknown is T1;
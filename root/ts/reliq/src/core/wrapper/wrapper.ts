
/**
 * **Note**
 * The `unwrap` method retrives the wrapped value of type `T1`.
 * 
 * **Warning**
 * Unwrapping may `panic` if the wrapper is in an invalid or failed sstate, ie. `Err` or `None`. In these cases
 * `unwrap` bypasses error handling.
 * 
 * **Example**
 * ```ts
 *  /// Will panic.
 *  Err(404).unwrap();
 *  None.unwrap();
 * 
 *  /// Will not panic.
 *  let float: Float;
 *  float.unwrap(); /// number
 * ```
 */
export type Wrapper<T1> = {

    /**
     * **Note**
     * Unwraps the wrapped value of type `T1`. 
     * 
     * **Warning**
     * Will throw an error or `panic` if the wrapper is in a failed state, like `Err` or `None`.
     * 
     * **Example**
     * ```ts
     *  Err(404).unwrap();
     *  None.unwrap();
     * 
     *  let myNumberWrapper: Wrapper<number>;
     *  myNumberWrapper.unwrap(); /// Safe wrapper that does not throw so
     *  /// it is ok to unwrap.
     * ```
     */
    unwrap(): T1;
};
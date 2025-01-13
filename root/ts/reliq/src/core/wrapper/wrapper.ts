/**
 * **NOTE**
 * A wrapper around a value of type `T1`, providing an `unwrap` method to extract the wrapped value.
 */
export type Wrapper<T1> = {
    unwrap(): T1;
};
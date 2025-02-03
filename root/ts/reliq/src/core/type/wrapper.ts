/**
 * ***Brief***
 * A wrapper for a value of type `T1` that provides a method to retrieve the wrapped value without handling.
 */
export type Wrapper<T1> = {

    /**
     * ***Brief***
     * Safely unwraps the wrapped value of type `T1`.
     * 
     * ***Requirement***
     * All exceptions to be handled.
     * 
     * ***Example***
     * ```ts
     *  let unsafe: Unsafe = Unsafe(500n);
     *  unsafe.unwrap();
     * ```
     */
    unwrap(): T1;
};
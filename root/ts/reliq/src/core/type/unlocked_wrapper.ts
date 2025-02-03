import { type Wrapper } from "@core";

/**
 * ***Brief***
 * Represents an unlocked wrapper which can be unlocked to retrieve its value. 
 */
export type UnlockedWrapper<T1> =
    & Omit<Wrapper<T1>, "unwrap">
    & {

    /**
     * ***Brief***
     * Unwraps the value to retrieve the original stored data of type `T1`. 
     *
     * ***Requirement***
     * The error state must be handled.
     * 
     * ***Example***
     * ```ts
     *  let result: Result<200n, 404n>;
     *  if (result.ok()) {
     *      let status: 200n = result.unwrap();
     *      /// ...
     *  }
     * ```
     */ 
    unwrap(): T1;
};
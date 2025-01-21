import type { Wrapper } from "@root";

/**
 * ***Brief***
 * Represents a "locked" value which can be unlocked to retrieve the actual value. 
 */
export type UnlockedWrapper<T1> =
    & Omit<Wrapper<T1>, "unwrap">
    & {

    /**
     * ***Brief***
     * Unlocks the value to retrieve the original stored data of type `T1`. 
     *
     * ***Requirement***
     * The error state must be handled.
     * 
     * ***Example***
     * ```ts
     *  let result: Result<200n, 404n>;
     *  if (result.ok()) {
     *      let status: 200n = result.unlock();
     *      /// ...
     *  }
     * ```
     */ 
    unlock(): T1;
};
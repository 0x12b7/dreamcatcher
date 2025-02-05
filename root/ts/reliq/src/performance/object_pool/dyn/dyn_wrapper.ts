import type { DeAlloc } from "@performance";

/**
 * ***Brief***
 * A dynamic wrapper for resource allocation and deallocation.
 */
export type DynWrapper<T1> = {

    /**
     * ***Brief***
     * Deallocates a resource, making it available for recycling.
     * 
     * ***Example***
     * ```ts
     *  let personD: Dyn<{ name: string }>;
     *  personD
     *      .deAlloc()
     *      .map(person => {
     *          /// Not run because `person` was deallocated.
     *          /// ...
     *      });
     * ```
     */
    deAlloc(): DeAlloc<T1>;
};
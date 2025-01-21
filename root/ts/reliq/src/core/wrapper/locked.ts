

/**
 * 
 */
export type UnlockedWrapper<T1> = {

    /**
     * ***Note***
     * The wrapper is safe to unlock. The value can
     * now be unlocked.
     */
    unlock(): T1;
};
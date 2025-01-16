
/**
 * **Note**
 * Standardized clonable object interface.
 * 
 */
export type Clonable<T1> = {
    clone(): T1;
};
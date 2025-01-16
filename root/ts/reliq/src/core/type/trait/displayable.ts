
/**
 * **Note**
 * Useful for debugging purposes.
 * 
 * **Example**
 * ```ts
 *  let value: Displayable;
 * 
 *  /// Should log itself to the console.
 *  value.display();
 * ```
 */
export type Displayable = {

    /**
     * **Note**
     * Logs a representation of the object, usually to the console.
     * 
     * **Example**
     * ```ts
     *  let value: Displayable;
     * 
     *  /// Should log itself to the console.
     *  value.display();
     * ```
     */
    display(): void;
};
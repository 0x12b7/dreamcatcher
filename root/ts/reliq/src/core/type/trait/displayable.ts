export type Displayable = {

    /**
     * 
     * **Note**
     * Useful for debugging purposes.
     * 
     * **Example**
     * ```typescript
     *  function Displayable(): Displayable {
     *      return { display };
     * 
     *      function display(): void {
     *          return console.log("Hello World");
     *      }
     *  }
     * 
     *  let value: Displayable = Displayable();
     *  value.display(); /// Hello World
     * ```
     */
    display(): void;
};

/**
 * **Note**
 * A utility type for creating branded types with a unique string literal `T1`.
 * 
 * **Where**
 * * `T1` is a string literal used as the unique identifier (brand).
 * 
 * **Example**
 * Defining two distinct branded types with unique identifiers:
 * ```ts
 *  type Foo = 
 *      & Branded<"Foo">
 *      & {
 *      foo(): void;
 *  };
 * 
 *  type Bar =
 *      & Branded<"Bar">
 *      & {
 *      foo(): void;
 *  };
 * 
 *  let union: Foo | Bar;
 *  if (union.type() === "Foo") {
 *      /// ...
 *  }
 * ```
 */
export type Branded<T1 extends string> = {

    /**
     * **Note**
     * A type-level marker method that specifies the unique type identifier `T1`.
     * 
     * **Warning**
     * Branding conflicts can occur if different modules reuse the same string literal for `T1`.
     * 
     * **Example**
     * Defining two distinct branded types with unique identifiers:
     * ```ts
     *  type Foo = 
     *      & Branded<"Foo">
     *      & {
     *      foo(): void;
     *  };
     * 
     *  type Bar =
     *      & Branded<"Bar">
     *      & {
     *      foo(): void;
     *  };
     * 
     *  let union: Foo | Bar;
     *  if (union.type() === "Foo") {
     *      /// ...
     *  }
     * ```
     */
    type(): T1;
};
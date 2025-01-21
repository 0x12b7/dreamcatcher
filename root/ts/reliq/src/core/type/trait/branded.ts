
/**
 * ***Brief***
 * Utility type for creating branded types with a unique string literal identifier `T1`.
 * 
 * ***Example***
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
     * ***Brief***
     * Type-level marker method specifying the unique type identifier `T1`.
     *
     * ***Example***
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
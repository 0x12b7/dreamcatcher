/**
 * ***Brief***
 * Utility type for creating branded types with a unique string literal identifier `T1`.
 * 
 * ***Example***
 * ```ts
 *  type Foo = 
 *      & BrandedStruct<"Foo">
 *      & {
 *      foo: void;
 *  };
 * 
 *  type Bar =
 *      & BrandedStruct<"Bar">
 *      & {
 *      foo: void;
 *  };
 * 
 *  let union: Foo | Bar;
 *  if (union.type === "Foo") {
 *      /// ...
 *  }
 * ```
 */
export type BrandedStruct<T1 extends string> = {

    /**
     * ***Brief***
     * Type-level marker specifying the unique type identifier `T1`.
     *
     * ***Example***
     * ```ts
     *  type Foo = 
     *      & BrandedStruct<"Foo">
     *      & {
     *      foo: void;
     *  };
     * 
     *  type Bar =
     *      & BrandedStruct<"Bar">
     *      & {
     *      foo: void;
     *  };
     * 
     *  let union: Foo | Bar;
     *  if (union.type === "Foo") {
     *      /// ...
     *  }
     * ```
     */
    type: T1;
};
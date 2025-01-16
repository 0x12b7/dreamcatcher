
/**
 * **Note**
 * A utility type to create unique branded subtypes for stronger
 * type safety. Particularly useful for differentiating between structurally
 * identical types while ensuring they are treated as distinct types in the type system.
 * 
 * **Example**
 * ```
 *  type User = 
 *      & Branded<"User">
 *      & {
 *      id(): string;
 *  };
 * 
 *  type Order =
 *      & Branded<"Order">
 *      & {
 *      id(): string;
 *  };
 * 
 *  function main(): void {
 *      let userOrOrder: User | Order;
 *      if (isBrand(userOrOrder, "User")) {
 *          let user: User = userOrOrder;
 *          /// ...
 *      }
 *  }
 * ```
 */
export type Branded<T1 extends string> = {
    type(): T1;
};
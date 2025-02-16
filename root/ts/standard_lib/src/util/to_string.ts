/** 
 * ***Brief***
 * Converts `unknown` to `string`.
 * 
 * ***Warning***
 * Does not support circular references and circular objects will result in `[object Object]`.
 * 
 * ***Example***
 *  ```ts
 *  console.log(to_string(42));          /// 42
 *  console.log(to_string(true));        /// true
 *  console.log(to_string(null));        /// null
 *  console.log(to_string(undefined));   /// undefined
 * 
 *  console.log(to_string("example"));   /// example
 * 
 *  let object: {
 *      color: string;
 *      speed: {
 *          min: number,
 *          max: number
 *      }
 *  } = {
 *      color: "Blue",
 *      speed: {
 *          min: 0,
 *          max: 500
 *      }
 *  };
 *  console.log(object);                /// {"color":"Blue","speed":{"min":0,"max":500}}
 * 
 *  function foo(): void {
 *      let x: string = 500;
 *      return x;
 *  }
 *  console.log(foo);                   /// function foo() {
 *                                      ///     x = 500;
 *                                      ///     return x;
 *                                      /// }
 *  ```
 */
export function to_string(unknown: unknown): string {
    if (unknown === null || unknown === undefined || typeof unknown !== "object") return String(unknown);
    try {
        return JSON.stringify(unknown);
    }
    catch {}
    return "[object Object]";
}
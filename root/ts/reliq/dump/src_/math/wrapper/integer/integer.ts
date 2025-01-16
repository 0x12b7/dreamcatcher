import { 
    type I8,
    type I16,
    type I32,
    type I64,
    type I128,
    type I256,
    type I,
    type U8,
    type U16,
    type U32,
    type U64,
    type U128,
    type U256,
    type U
} from "@root";

/**
 * **Note**
 * A `bigint` `Wrapper` that enforces various ranges at result-time.
 * 
 * **Example**
 * ```
 *  /// Will panic because 500n is out of range. All fail cases are
 *  /// properly typed.
 *  U8(500n).unwrap();
 * 
 *  U8(1000n).mapErr(e => {
 *      /// All errors are properly mapped.
 *      /// ...
 *  });
 * ```
 */
type Integer =
    | I8
    | I16
    | I32
    | I64
    | I128
    | I256
    | I
    | U8
    | U16
    | U32
    | U64
    | U128
    | U256
    | U;

export type { Integer };
import {
    type Branded,
    type ValidatedWrapper,
    type Serializable,
    type Displayable,
    type Function,
    type Option,
    StringHandler,
    None,
    Ok
} from "@root";

export type Some<T1> =
    & Branded<"Some">
    & ValidatedWrapper<T1>
    & Serializable
    & Displayable
    & {

    /**
     * **NOTE**
     * - `TypeGuard` to check if the value is of the type `Some`.
     * - Returns `true` because the current instance is `Some`.
     * 
     * **EXAMPLE**
     * ```typescript
     *  let value: Some<number> = Some(20);
     *  value.some(); /// true
     * ```
     */
    some(): this is Some<T1>;

    /**
     * 
     * **EXAMPLE**
     * ```typescript
     *  let value: Some<number> = Some(20);
     *  value.none(); /// false
     * ```
     */
    none(): this is None;

    /**
     * **Warning**
     * Unused method, present because of `Option` type inference.
     * 
     */
    expect(__: unknown): T1;

    unwrapOr(__: unknown): T1;

    /**
     * **NOTE**
     * Applies an operation to the value contained in the `Some<T1>` if it exists,
     * returning a new `Option<T2>` resulting from the operation. If the current `Option`
     * is `None`, this operation will not be executed, and `None` will be returned.
     * 
     * **Example**
     * ```typescript
     *  let value: Option<number> = Some(200);
     *  value
     *      .and(length => {
     *          if (length > 100) return Some("LARGE");
     *          return None;
     *      })
     *      .and(value => {
     *          console.log(value); /// LARGE
     *      });
     * ```
     */
    and<T2>(operation: Function<T1, Option<T2>>): Option<T2>;
    
    /**
     * **NOTE**
     * Transforms the value contained in the `Some<T1>` to a new value of type `T2` using the provided `operation`.
     * Returns a new `Some<T2>` containing the result of the transformation.
     * - If the `Option` is `None`, the transformation is not applied and `None` is returned.
     * 
     */
    map<T2>(operation: Function<T1, T2>): Some<T2>;
    toResult(__: unknown): Ok<T1>;
};

export function Some<T1>(_value: T1): Some<T1> {
    /** @constructor */ {
        return {
            type,
            some,
            none,
            expect,
            unwrap,
            unwrapOr,
            unwrapSafely,
            and,
            map,
            toResult,
            toString,
            display
        };
    }

    function type(): "Some" {
        return "Some";
    }

    function some(): this is Some<T1> {
        return true;
    }

    function none(): this is None {
        return false;
    }

    function expect(__: unknown): T1 {
        return _value;
    }

    function unwrap(): T1 {
        return _value;
    }

    function unwrapOr(__: unknown): T1 {
        return _value;
    }

    function unwrapSafely(): T1 {
        return _value;
    }

    function and<T2>(operation: Function<T1, Option<T2>>): Option<T2> {
        return operation(_value);
    }

    function map<T2>(operation: Function<T1, T2>): Some<T2> {
        return Some(operation(_value));
    }

    function toResult(__: unknown): Ok<T1> {
        return Ok(_value);
    }

    function toString(): string {
        return type() + "(" + StringHandler().toString(_value) + ")";
    }

    function display(): void {
        return console.log(toString());
    }
}
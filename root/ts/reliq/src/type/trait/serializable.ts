/**
 * ***Brief***
 * A trait representing objects that can be serialized to a string format.
 * 
 * ***Example***
 * ```ts
 *  let foo: Serializable;
 *  let fooRepresentation: string = foo.toString();
 * ```
 */
export type Serializable = {

    /**
     * ***Brief***
     * Converts the implementing object to its string representation.
     * 
     * ***Example***
     * ```ts
     *  let foo: Serializable;
     *  let fooRepresentation: string = foo.toString();
     * ```
     */
    toString(): string;
};
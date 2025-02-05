import type { Closure } from "@root";

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

export namespace BrandedStruct {
    export type Task<T1 extends string> = Closure<[value: BrandedStruct<T1>], void>;

    export type Handler = {
        match<T1 extends string = any>(unknown: unknown): unknown is BrandedStruct<T1>;
        match<T1 extends string = any>(unknown: unknown, task: Task<T1>): unknown is BrandedStruct<T1>;
        match<T1 extends string>(unknown: unknown, brand: T1): unknown is BrandedStruct<T1>;
        match<T1 extends string>(unknown: unknown, brand: T1, task: Task<T1>): unknown is BrandedStruct<T1>;
    };

    export const Handler: Handler = (() => {
        /** @constructor */ {
            return { match };
        }

        function match<T1 extends string = any>(unknown: unknown): unknown is BrandedStruct<T1>;
        function match<T1 extends string = any>(unknown: unknown, task: Closure<[item: BrandedStruct<T1>], void>): unknown is BrandedStruct<T1>;
        function match<T1 extends string>(unknown: unknown, brand: T1): unknown is BrandedStruct<T1>;
        function match<T1 extends string>(unknown: unknown, brand: T1, task: Closure<[item: BrandedStruct<T1>], void>): unknown is BrandedStruct<T1>;
        function match<T1 extends string>(
            p0: unknown,
            p1?: Task<T1> | T1,
            p2?: Task<T1>
        ): p0 is BrandedStruct<T1> {
            let unknown: unknown = p0;
            if (!_valid(unknown)) return false;
            if (typeof p1 === "string") {
                let brand: T1 = p1;
                if (!_valid(unknown, brand)) return false;
            }
            let value: BrandedStruct<T1> = (unknown as BrandedStruct<T1>);
            if (typeof p1 === "function") {
                let task: Task<T1> = p1;
                task(value);
                return true;
            }
            if (typeof p2 === "function") {
                let task: Task<T1> = p2;
                task(value);
                return true;
            }
            return true;
        }

        function _valid<T1 extends string>(unknown: unknown): unknown is BrandedStruct<T1>;
        function _valid<T1 extends string>(unknown: unknown, brand: T1): unknown is BrandedStruct<T1>;
        function _valid<T1 extends string>(
            p0: unknown,
            p1?: T1
        ): p0 is BrandedStruct<T1> {
            let unknown: unknown = p0;
            if (!(
                unknown !== null
                && unknown !== undefined
                && typeof unknown === "object"
                && "type" in unknown
                && typeof unknown.type === "string"
            )) return false;
            if (p1 && unknown.type !== p1) return false;
            return true;
        }
    })();
}
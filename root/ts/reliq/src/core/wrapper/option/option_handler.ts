import type { Option } from "@root";
import type { SomeValOfAll } from "@root";

/**
 * ***Brief***
 * The `OptionHandler` type provides utility methods for working with multiple `Option` values.
 */
export type OptionHandler = {

    /**
     * ***Brief***
     * Returns `None` if **any** `Option` is `None`.
     */
    all<T1 extends Array<Option<unknown>>>(options: T1): Option<SomeValOfAll<T1>>;
    
    /**
     * ***Brief***
     * Returns the first successful `Some` value.
     */
    any<T1 extends Array<Option<unknown>>>(options: T1): Option<SomeValOfAll<T1>[number]>;
};
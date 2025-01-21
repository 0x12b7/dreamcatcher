import type { OptionHandler } from "@root";
import type { SomeValOfAll } from "@root";
import { Some } from "@root";
import { None } from "@root";

/**
 * ***Brief***
 * A type that represents an optional value, encapsulating either a value `Some` 
 * or the absence of a value `None`.
 */
export type Option<T1> = Some<T1> | None;

export const Option: OptionHandler = (() => {
    /** @constructor */ {
        return { all, any };
    }

    function all<T1 extends Array<Option<unknown>>>(options: T1): Option<SomeValOfAll<T1>> {
        let out: Array<unknown> = [];
        let i: number = 0;
        while (i < options.length) {
            let option: Option<unknown> = options.at(i)!;
            if (option.none()) return option as None;
            out.push(option.unlock());
            i ++;
        }
        return Some(out as SomeValOfAll<T1>);
    }

    function any<T1 extends Array<Option<unknown>>>(options: T1): Option<SomeValOfAll<T1>[number]> {
        let i: number = 0;
        while (i < options.length) {
            let option: Option<unknown> = options.at(i)!;
            if (option.some()) return option as Some<SomeValOfAll<T1>[number]>;
        }
        return None;
    }
})();
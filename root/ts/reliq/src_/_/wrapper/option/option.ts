"raise 1";

import type { OptionHandler } from "@root";
import type { SomeValOfAll } from "@root";
import { Some } from "@root";
import { None } from "@root";
import { isBranded } from "@root";

/**
 * ***Brief***
 * A type that represents an optional value, encapsulating either a value `Some` 
 * or the absence of a value `None`.
 */
export type Option<T1> = Some<T1> | None;

export const Option: OptionHandler = (() => {
    /** @constructor */ {
        return { flag, all, any };
    }

    function flag<T1>(value: T1 | null | undefined): Option<T1> {
        if (value === null) return None;
        if (value === undefined) return None;
        return Some((value as T1));
    }

    function all<T1 extends Array<Option<unknown>>>(...options: T1): Option<SomeValOfAll<T1>> {
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

    function any<T1 extends Array<Option<unknown>>>(...options: T1): Option<SomeValOfAll<T1>[number]> {
        let i: number = 0;
        while (i < options.length) {
            let option: Option<unknown> = options.at(i)!;
            if (option.some()) return option as Some<SomeValOfAll<T1>[number]>;
            i ++;
        }
        return None;
    }
})();
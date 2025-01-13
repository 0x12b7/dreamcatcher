import type { AsyncClosure } from "@root";
import type { Closure } from "@root";
import type { Option } from "@root";
import type { AsyncOption } from "@root";
import type { OptionArray } from "@root";
import type { SomeValOfAll } from "@root";
import { Some } from "@root";
import { None } from "@root";

type OptionHandler = {

    /**
     * **OUTCOME**
     * Iterate through an `OptionArray`, short circuit at the first `None` or return
     * a `Tuple` of all successful values. Will return an `Option`.
     * 
     * **NOTE**
     * - Returns `None` if **any** value is `None`.
     * 
     * @example
     *  let option0: Option<string> = Some("");
     *  let option1: Option<7> = Some(7);
     *  let option2: Option<5> = None;
     *  let newOption: Option<[string, 7]> = OptionHandler.all(option0, option1, option2);
     *  newOption.some(); /// false
     *  newOption.none(); /// true
     *  
     * @example
     *  let option0: Option<string> = Some("");
     *  let option1: Option<7> = Some(7);
     *  let option2: Option<5> = Some(5);
     *  let newOption: Option<[string, 7, 5]> = OptionHandler.all(option0, option1, option2);
     *  newOption.some(); /// true
     *  newOption.none(); /// false
     */
    all<T1 extends OptionArray<unknown>>(...options: T1): Option<SomeValOfAll<T1>>;
    
    /**
     * **NOTE**
     * - Returns the first successful `Some` value encountered.
     * - Returns `None` only if **all** options are `None`. 
     * 
     * @example
     * let o0: Option<string>;
     * let o1: Option<750000>;
     * let o2: Option<500000>;
     * let o: Option<string | 750000 | 500000> = OptionHandler.any(o0, o1, o2);
     */
    any<T1 extends OptionArray<unknown>>(...options: T1): Option<SomeValOfAll<T1>[number]>;
};

const OptionHandler: OptionHandler = (() => {
    /** @constructor */ {
        return { all, any };
    }

    function all<T1 extends OptionArray<unknown>>(...options: T1): Option<SomeValOfAll<T1>> {
        let out: Array<unknown> = [];
        let i: number = 0;
        while (i < options.length) {
            let option: Option<unknown> = options.at(i)!;
            if (option.none()) return option as None;
            out.push(option.unwrapSafely());
            i ++;
        }
        return Some(out as SomeValOfAll<T1>);
    }

    function any<T1 extends OptionArray<unknown>>(...options: T1): Option<SomeValOfAll<T1>[number]> {
        let i: number = 0;
        while (i < options.length) {
            let option: Option<unknown> = options.at(i)!;
            if (option.some()) return option as Some<SomeValOfAll<T1>[number]>;
        }
        return None;
    }
})();
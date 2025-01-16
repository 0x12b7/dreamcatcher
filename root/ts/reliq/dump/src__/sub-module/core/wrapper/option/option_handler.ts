import type {
    Option,
    OptionArray,
    SomeValOfAll
} from "@core";

import {
    Some,
    None
} from "@core";

export type OptionHandler = {

    /**
     * **NOTE**
     * - Returns `None` if **any** `Option` is `None`.
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
     *  newOption.map(values => {
     *      console.log(values); /// ["", 7, 5]
     *  });
     */
    all<T1 extends OptionArray<unknown>>(...options: T1): Option<SomeValOfAll<T1>>;
    
    /**
     * **NOTE**
     * - Returns the first successful `Some` value encountered.
     * - Returns `None` only if **all** options are `None`. 
     * 
     * @example
     * let option0: Option<string> = None;
     * let option1: Option<7> = None;
     * let option2: Option<5> = None;
     * let newOption: Option<never> = OptionHandler.any(option0, option1, option2);
     * newOption.some(); /// false
     * newOption.none(); /// true
     * 
     * @example
     *  let option0: Option<string> = None;
     *  let option1: Option<7> = None;
     *  let option2: Option<5> = Some(5);
     *  let newOption: Option<5> = OptionHandler.any(option0, option1, option2);
     *  newOption.some() /// true
     *  newOption.none() /// false
     *  newOption.map(values => {
     *      console.log(value); /// 5
     *  });
     */
    any<T1 extends OptionArray<unknown>>(...options: T1): Option<SomeValOfAll<T1>[number]>;
};

export const OptionHandler: OptionHandler = (() => {
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
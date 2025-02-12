import type { SelectorHandler } from "./selector_handler";
import type { Data } from "../data/data";
import { toString } from "./util/_to_string";

export type Selector = `${ string }(${ string })`;

export const Selector: SelectorHandler = (() => {
    /***/ {
        return { from };
    }
    
    function from(name: string, ...data: Array<Data>): Selector {
        return `${ name }(${ toString(...data) })`;
    }
})();
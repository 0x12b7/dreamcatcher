import type { Numeric } from "@root";
import type { SignedInteger } from "@root";
import type { SignedIntegerResultMap } from "@root";
import { Ok } from "@root";
import { Err } from "@root";
import { Error } from "@root";
import { isBrand } from "@root";

type SignedIntegerParser = {
    parse<T1 extends SignedInteger, T2 extends Numeric>(to: T1, from: T2): SignedIntegerResultMap<T1, T2>;
};

const SignedIntegerParser: SignedIntegerParser = (() => {
    /** @constructor */ {
        return { parse };
    }

    function parse<T1 extends SignedInteger, T2 extends Numeric>(to: T1, from: T2): SignedIntegerResultMap<T1, T2> {
        if (typeof from === "number" || isBrand(from, "Float")) {
            
        }
    }
})();

export { SignedIntegerParser };
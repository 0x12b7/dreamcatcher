import type { ExternalPureSignatureHandler } from "./external_pure_signature_handler"; 
import type { Selector } from "./selector";
import type { Data } from "../data.s_mod/data";
import { toString } from "./util/to_string";

export type ExternalPureSignature = `function ${ string }(${ string }) external pure returns (${ string })`;

export const ExternalPureSignature: ExternalPureSignatureHandler = (() => {
    /***/ {
        return { from };
    }

    function from(selector: Selector, ...data: Array<Data>): ExternalPureSignature {
        return `function ${ selector } external pure returns (${ toString(...data) })`;
    }
})();
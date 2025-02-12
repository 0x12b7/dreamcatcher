import type { ExternalViewSignatureHandler } from "./external_view_signature_handler";
import type { Selector } from "./selector";
import type { Data } from "../data.s_mod/data";
import { toString } from "./util/to_string";

export type ExternalViewSignature = `function ${ string }(${ string }) external view returns (${ string })`;

export const ExternalViewSignature: ExternalViewSignatureHandler = (() => {
    /***/ {
        return { from };
    }

    function from(selector: Selector, ...data: Array<Data>): ExternalViewSignature {
        return `function ${ selector } external view returns (${ toString(...data) })`;
    }
})();
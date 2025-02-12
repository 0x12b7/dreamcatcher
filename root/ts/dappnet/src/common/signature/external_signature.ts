import type { ExternalSignatureHandler } from "./external_signature_handler";
import type { Selector } from "./selector";

export type ExternalSignature = `function ${ string }(${ string }) external`;

export const ExternalSignature: ExternalSignatureHandler = (() => {
    /***/ {
        return { from };
    }

    function from(selector: Selector): ExternalSignature {
        return `function ${ selector } external`;
    }
})();
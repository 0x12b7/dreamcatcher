import type { EventSignatureHandler } from "./event_signature_handler";
import type { Selector } from "./selector";

export type EventSignature = `event ${ string }(${ string })`;

export const EventSignature: EventSignatureHandler = (() => {
    /***/ {
        return { from };
    }

    function from(selector: Selector): EventSignature {
        return `event ${ selector }`;
    }
})();
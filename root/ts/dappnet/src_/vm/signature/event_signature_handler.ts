import type { Selector } from "./selector";
import type { EventSignature } from "./event_signature";

export type EventSignatureHandler = {
    from(selector: Selector): EventSignature;
};
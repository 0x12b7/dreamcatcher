import type { Selector } from "./selector";
import type { ExternalSignature } from "./external_signature";

export type ExternalSignatureHandler = {
    from(selector: Selector): ExternalSignature;
};
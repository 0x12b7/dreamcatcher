import type { Selector } from "./selector";
import type { Data } from "../data/data";
import type { ExternalViewSignature } from "./external_view_signature";

export type ExternalViewSignatureHandler = {
    from(selector: Selector, ...data: Array<Data>): ExternalViewSignature;
};
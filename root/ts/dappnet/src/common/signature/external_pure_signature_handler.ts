import type { Selector } from "./selector";
import type { Data } from "../data/data";
import type { ExternalPureSignature } from "./external_pure_signature";

export type ExternalPureSignatureHandler = {
    from(selector: Selector, ...data: Array<Data>): ExternalPureSignature;
};
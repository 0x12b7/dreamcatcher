import { Selector } from "src/vm/ethereum/mod";

export type ExternalSignature = `function ${ string }(${ string }) external`;

export function ExternalSignature(selector: Selector): ExternalSignature {
    return `function ${ selector } external`;
}
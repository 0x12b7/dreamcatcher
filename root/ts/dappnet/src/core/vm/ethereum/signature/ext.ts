import { Selector } from "@core.vm.ethereum";

export type ExternalSignature = `function ${ string }(${ string }) external`;

export function ExternalSignature(selector: Selector): ExternalSignature {
    return `function ${ selector } external`;
}
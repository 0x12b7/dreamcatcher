import type { Data } from "@core.vm.ethereum";
import { Selector } from "@core.vm.ethereum";
import { dataToString } from "@core.vm.ethereum";

export type ExternalPureSignature = `function ${ string }(${ string }) external pure returns (${ string })`;

export function ExternalPureSignature(selector: Selector, ... out: Array<Data>): ExternalPureSignature {
    return `function ${ selector } external pure returns (${ dataToString(out) })`;
}
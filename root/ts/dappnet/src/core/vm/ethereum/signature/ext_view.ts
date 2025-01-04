import type { Data } from "@core.vm.ethereum";
import { Selector } from "@core.vm.ethereum";
import { dataToString } from "@core.vm.ethereum";

export type ExternalViewSignature = `function ${ string }(${ string }) external view returns (${ string })`;

export function ExternalViewSignature(selector: Selector, ... out: Array<Data>): ExternalViewSignature {
    return `function ${ selector } external view returns (${ dataToString(out) })`;
}
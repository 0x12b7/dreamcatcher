import type { Data } from "src/vm/ethereum/mod";
import { Selector } from "src/vm/ethereum/mod";
import { dataToString } from "src/vm/ethereum/mod";

export type ExternalViewSignature = `function ${ string }(${ string }) external view returns (${ string })`;

export function ExternalViewSignature(selector: Selector, ... out: Array<Data>): ExternalViewSignature {
    return `function ${ selector } external view returns (${ dataToString(out) })`;
}
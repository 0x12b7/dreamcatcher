import type { Data } from "src/vm/ethereum/mod";
import { Selector } from "src/vm/ethereum/mod";
import { dataToString } from "src/vm/ethereum/mod";

export type ExternalPureSignature = `function ${ string }(${ string }) external pure returns (${ string })`;

export function ExternalPureSignature(selector: Selector, ... out: Array<Data>): ExternalPureSignature {
    return `function ${ selector } external pure returns (${ dataToString(out) })`;
}
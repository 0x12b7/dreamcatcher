import { EvmSelector } from "@$";
import { EvmDataType } from "@$";

export type EvmExternalPureSignature = `function ${ string }(${ string }) external pure returns (${ string })`;
export function EvmExternalPureSignature(selector: EvmSelector, ...out: Array<EvmDataType>): EvmExternalPureSignature {
    return `function ${ selector } external pure returns (${ EvmDataType.toString(out) })`;
}
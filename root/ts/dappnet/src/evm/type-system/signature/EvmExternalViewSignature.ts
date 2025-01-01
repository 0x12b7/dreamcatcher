import { EvmSelector } from "@$";
import { EvmDataType } from "@$";

export type EvmExternalViewSignature = `function ${ string }(${ string }) external view returns (${ string })`;
export function EvmExternalViewSignature(selector: EvmSelector, ...out: Array<EvmDataType>): EvmExternalViewSignature {
    return `function ${ selector } external view returns (${ EvmDataType.toString(out) })`;
}
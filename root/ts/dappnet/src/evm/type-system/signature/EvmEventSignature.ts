import { EvmSelector } from "@$";

export type EvmEventSignature = `event ${ string }(${ string })`;
export function EvmEventSignature(selector: EvmSelector): EvmEventSignature {
    return `event ${ selector }`;
}
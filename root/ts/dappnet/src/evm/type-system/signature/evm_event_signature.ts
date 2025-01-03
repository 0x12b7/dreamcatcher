import { EvmSelector } from "@root";

export type EvmEventSignature = `event ${ string }(${ string })`;

export function EvmEventSignature(selector: EvmSelector): EvmEventSignature {
    return `event ${ selector }`;
}
import { Selector } from "@core.vm.ethereum";

export type EventSignature = `event ${ string }(${ string })`;

export function EventSignature(selector: Selector): EventSignature {
    return `event ${ selector }`;
}
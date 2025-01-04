import { Selector } from "src/vm/ethereum/mod";

export type EventSignature = `event ${ string }(${ string })`;

export function EventSignature(selector: Selector): EventSignature {
    return `event ${ selector }`;
}
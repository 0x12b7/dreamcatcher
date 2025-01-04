import type { Data } from "src/vm/ethereum/mod";
import { dataToString } from "src/vm/ethereum/mod";

export type Selector = `${ string }(${ string })`;

export function Selector(name: string, ... args: Array<Data>): Selector {
    return `${ name }(${ dataToString(args) })`;
}
import type { Data } from "@core.vm.ethereum";
import { dataToString } from "@core.vm.ethereum";

export type Selector = `${ string }(${ string })`;

export function Selector(name: string, ... args: Array<Data>): Selector {
    return `${ name }(${ dataToString(args) })`;
}
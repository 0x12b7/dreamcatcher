import { EvmDataType } from "@root";

export type EvmSelector = `${ string }(${ string })`;

export function EvmSelector(name: string, ... args: Array<EvmDataType>): EvmSelector {
    return `${ name }(${ EvmDataType.toString(args) })`;
}
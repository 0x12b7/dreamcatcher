import { EvmDataType } from "@root";

export type EvmDataTypeHandler = {
    toString(... args: Array<EvmDataType>): string;
};
import { EvmDataType } from "@$";

export type EvmDataTypeHandler = {
    toString(... args: Array<EvmDataType>): string;
};
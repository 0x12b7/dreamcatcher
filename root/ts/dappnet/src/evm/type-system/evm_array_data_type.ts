import type { EvmArithmeticDataType } from "@root";
import type { EvmBytesDataType } from "@root";
import type { EvmBaseDataType } from "@root";

export type EvmArrayDataType = `${ EvmArithmeticDataType | EvmBytesDataType | EvmBaseDataType }[]`;
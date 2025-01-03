import type { EvmArithmeticBitSize } from "@root";

export type EvmArithmeticDataType = "uint" | "int" | `${ "uint" | "int" }${ EvmArithmeticBitSize }`;
import type { EvmArithmeticBitSize } from "@$";

export type EvmArithmetic = "uint" | "int" | `${ "uint" | "int" }${ EvmArithmeticBitSize }`;
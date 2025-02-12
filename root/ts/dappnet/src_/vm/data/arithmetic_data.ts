import type { ArithmeticDataBitSize } from "./arithmetic_data_bit_size";

export type ArithmeticData = "uint" | "int" | `${ "uint" | "int" }${ ArithmeticDataBitSize }`;
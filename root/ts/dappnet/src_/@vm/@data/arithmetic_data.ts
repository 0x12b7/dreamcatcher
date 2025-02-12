import type { ArithmeticDataBitSize } from "src_/@vm/@data/s_mod";

export type ArithmeticData = "uint" | "int" | `${ "uint" | "int" }${ ArithmeticDataBitSize }`;
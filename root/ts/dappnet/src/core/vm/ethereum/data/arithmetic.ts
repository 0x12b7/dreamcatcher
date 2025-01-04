import type { ArithmeticBitSize } from "@core.vm.ethereum";

export type Arithmetic = "uint" | "int" | `${ "uint" | "int" }${ ArithmeticBitSize }`;
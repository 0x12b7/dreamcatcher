import type { ArithmeticBitSize } from "src/vm/ethereum/mod";

export type Arithmetic = "uint" | "int" | `${ "uint" | "int" }${ ArithmeticBitSize }`;
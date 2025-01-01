import type { EvmArithmetic } from "@$";
import type { EvmBytes } from "@$";
import type { EvmBase } from "@$";

export type EvmArray = `${ EvmArithmetic | EvmBytes | EvmBase }[]`;
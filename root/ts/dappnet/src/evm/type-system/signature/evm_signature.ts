import { EvmEventSignature } from "@root";
import { EvmExternalPureSignature } from "@root";
import { EvmExternalSignature } from "@root";
import { EvmExternalViewSignature } from "@root";

export type EvmSignature =
    | EvmEventSignature
    | EvmExternalPureSignature
    | EvmExternalSignature
    | EvmExternalViewSignature;
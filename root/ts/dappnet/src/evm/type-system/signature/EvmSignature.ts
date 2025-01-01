import { EvmEventSignature } from "@$";
import { EvmExternalPureSignature } from "@$";
import { EvmExternalSignature } from "@$";
import { EvmExternalViewSignature } from "@$";

export type EvmSignature =
    | EvmEventSignature
    | EvmExternalPureSignature
    | EvmExternalSignature
    | EvmExternalViewSignature;
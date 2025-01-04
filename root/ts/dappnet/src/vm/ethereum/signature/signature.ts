import { EventSignature } from "src/vm/ethereum/mod";
import { ExternalPureSignature } from "src/vm/ethereum/mod";
import { ExternalViewSignature } from "src/vm/ethereum/mod";
import { ExternalSignature } from "src/vm/ethereum/mod";

export type Signature =
    | EventSignature
    | ExternalSignature
    | ExternalPureSignature
    | ExternalViewSignature;
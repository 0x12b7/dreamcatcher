import { EventSignature } from "@core.vm.ethereum";
import { ExternalPureSignature } from "@core.vm.ethereum";
import { ExternalViewSignature } from "@core.vm.ethereum";
import { ExternalSignature } from "@core.vm.ethereum";

export type Signature =
    | EventSignature
    | ExternalSignature
    | ExternalPureSignature
    | ExternalViewSignature;
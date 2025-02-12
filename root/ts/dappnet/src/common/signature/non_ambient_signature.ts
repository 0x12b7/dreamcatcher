import type { Signature } from "./signature";
import type { EventSignature } from "./event_signature";

export type NonAmbientSignature = Exclude<Signature, EventSignature>;

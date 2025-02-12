import type { Signature } from "./signature";
import type { Option } from "reliq";

export type SignatureHandler = {
    nameOf(signature: Signature): Option<string>;
};
import type { EventSignature } from "./event_signature";
import type { ExternalPureSignature } from "./external_pure_signature";
import type { ExternalViewSignature } from "./external_view_signature";
import type { ExternalSignature } from "./external_signature";
import type { SignatureHandler } from "./signature_handler";
import type { Option } from "reliq";
import { Some } from "reliq";
import { None } from "reliq";
import { flag } from "reliq";

export type Signature =
    | EventSignature
    | ExternalPureSignature
    | ExternalViewSignature
    | ExternalSignature;

export const Signature: SignatureHandler = (() => {
    /***/ {
        return { nameOf };
    }

    function nameOf(signature: Signature): Option<string> {
        let shards: Array<string> = signature.split(" ");
        if (shards.length === 0) return None;
        let string: Option<string> = flag(shards.at(1));
        if (string.none()) return string;
        let string$0: string = string.unwrap();
        let result: Option<string> = flag(
            string$0
                .split("(")
                .at(0)
        );
        if (result.none()) return result;
        let result$0: string = result.unwrap();
        return Some(result$0);
    }
})();
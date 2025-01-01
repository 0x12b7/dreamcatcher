import { EvmExternalViewSignature } from "dappnet";

export type Query = {
    type: "query";
    to: string;
    signature: EvmExternalViewSignature;
    args?: Array<unknown>;
};
export function Query($: Query): Query {
    /***/ {
        return $;
    }
}
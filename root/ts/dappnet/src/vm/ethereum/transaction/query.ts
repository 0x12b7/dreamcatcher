import { ExternalViewSignature } from "src/vm/ethereum/mod";

export type Query<T1 extends Array<unknown>> = {
    type: "TX.QUERY_TRANSACTION";
    privateKey: string;
    to: string;
    signature: ExternalViewSignature;
    args?: T1;
};

export function Query<T1 extends Array<unknown>>({ privateKey, to, signature, args }: Omit<Query<T1>, "type">): Query<T1> {
    /** @constructor */ {
        return {
            type: "TX.QUERY_TRANSACTION",
            privateKey,
            to,
            signature,
            args
        };
    }
}
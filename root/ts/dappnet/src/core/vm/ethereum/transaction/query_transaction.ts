import { ExternalViewSignature } from "@core.vm.ethereum";

export type QueryTransaction<T1 extends Array<unknown>> = {
    type: "TX.QUERY_TRANSACTION";
    to: string;
    signature: ExternalViewSignature;
    args?: T1;
};

export function QueryTransaction<T1 extends Array<unknown>>({ to, signature, args }: Omit<QueryTransaction<T1>, "type">): QueryTransaction<T1> {
    /** @constructor */ {
        return {
            type: "TX.QUERY_TRANSACTION",
            to,
            signature,
            args
        };
    }
}
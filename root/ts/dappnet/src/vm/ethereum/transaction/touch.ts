import type { Signature } from "src/vm/ethereum/mod";

export type Touch<T1 extends Array<unknown>> = {
    type: "TX.TRANSACTION";
    privateKey: string;
    to: string;
    signature: Signature;
    args?: T1;
    gasPrice?: bigint;
    gasLimit?: bigint;
    amount?: bigint;
    chainId?: bigint;
    timeout?: number;
    confirmations?: bigint;
};

export function Touch<T1 extends Array<unknown>>({
    privateKey,
    to,
    signature,
    args,
    gasPrice,
    gasLimit,
    amount = 0n,
    chainId,
    timeout,
    confirmations = 1n
}: Omit<Touch<T1>, "type">): Touch<T1> {
    /** @constructor */ {
        return {
            type: "TX.TRANSACTION",
            privateKey,
            to,
            signature,
            args,
            gasPrice,
            gasLimit,
            amount,
            chainId,
            timeout,
            confirmations
        };
    }
}
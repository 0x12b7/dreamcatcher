import type { Signature } from "src/vm/ethereum/mod";

export type Call<T1 extends Array<unknown>> = {
    type: "TX.TRANSACTION";
    privateKey: string;
    to: string;
    signature: Signature;
    args?: T1;
    gasPrice?: bigint;
    gasLimit?: bigint;
    amount?: bigint;
    chainId?: bigint;
    confirmations?: bigint;
};

export function Call<T1 extends Array<unknown>>({
    privateKey,
    to,
    signature,
    args,
    gasPrice,
    gasLimit,
    amount = 0n,
    chainId,
    confirmations = 1n
}: Omit<Call<T1>, "type">): Call<T1> {
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
            confirmations
        };
    }
}